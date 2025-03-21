package com.gwithus.telemetryjavamavlinkv2.client;

import com.gwithus.telemetryjavamavlinkv2.service.MavlinkMessageHandlerService;
import com.gwithus.telemetryjavamavlinkv2.utils.ZeroTierIPProvider;
import io.dronefleet.mavlink.MavlinkConnection;
import io.dronefleet.mavlink.MavlinkMessage;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;
import java.net.*;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class MavlinkClient {

    private final List<Integer> udpPorts = List.of(14552,14553,14554,14555,14556,14557,14558,14559);
    private final ExecutorService executorService = Executors.newFixedThreadPool(udpPorts.size() * 2);

    private final ZeroTierIPProvider zeroTierIPProvider;

    private final MavlinkMessageHandlerService messageHandlerService;

    public MavlinkClient(ZeroTierIPProvider zeroTierIPProvider, MavlinkMessageHandlerService messageHandlerService) {
        this.zeroTierIPProvider = zeroTierIPProvider;
        this.messageHandlerService = messageHandlerService;
    }


    // Automatically start listening after bean initialization.
    @PostConstruct
    public void init() {
        startListening();
    }

    public void startListening() {
        for (int port : udpPorts) {
            List<InetAddress> bindAddresses = zeroTierIPProvider.getZeroTierIPs();
            if (bindAddresses.isEmpty()) {
                try {
                    bindAddresses.add(InetAddress.getByName("0.0.0.0"));
                } catch (UnknownHostException e) {
                    System.err.printf("❌ Error binding to 0.0.0.0 for port %d: %s%n", port, e.getMessage());
                    continue;
                }
            }
            for (InetAddress address : bindAddresses) {
                // Use a lambda to start a listener for each IP/port combination.
                executorService.execute(() -> listenOnPort(address, port));
            }
        }

    }

    // Helper method to perform UDP listening on a specific IP and port.
    private void listenOnPort(InetAddress bindAddress, int port) {
        try (DatagramSocket udpSocket = new DatagramSocket(new InetSocketAddress(bindAddress, port))) {
            System.out.printf("✅ Listening for MAVLink messages on IP %s, Port: %d%n", bindAddress, port);
            UdpInputStream udpInputStream = new UdpInputStream(udpSocket);
            MavlinkConnection mavlinkConnection = MavlinkConnection.create(udpInputStream, null);
            while (!Thread.currentThread().isInterrupted()) {
                MavlinkMessage<?> message = mavlinkConnection.next();
                if (message != null) {
                    InetAddress senderAddress = udpInputStream.getSenderAddress();
                    int senderPort = udpInputStream.getSenderPort();
                    messageHandlerService.handleMessage(message, port, udpSocket, senderAddress, senderPort);
                }
            }
        } catch (Exception e) {
            System.err.printf("❌ Error on port %d, IP %s: %s%n", port, bindAddress, e.getMessage());
        }
    }

    // Helper InputStream to read data from a UDP socket.
    private static class UdpInputStream extends InputStream {
        private final DatagramSocket socket;
        private final byte[] buffer = new byte[4096];
        private int position = 0, length = 0;
        private InetAddress senderAddress;
        private int senderPort;

        public UdpInputStream(DatagramSocket socket) {
            this.socket = socket;
        }

        @Override
        public int read() throws IOException {
            if (position >= length) {
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
                socket.receive(packet);
                length = packet.getLength();
                position = 0;
                senderAddress = packet.getAddress();
                senderPort = packet.getPort();
            }
            return buffer[position++] & 0xFF;
        }

        public InetAddress getSenderAddress() {
            return senderAddress;
        }

        public int getSenderPort() {
            return senderPort;
        }
    }
}