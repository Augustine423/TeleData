import { useState } from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

const HelpCenter = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      console.log("Form Data:", data);
    };
  return (
    <div className="flex flex-col w-full h-full bg-slate-50 p-1 space-y-12">
      {/* Search Section */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          What kind of assistance do you need?
        </h2>
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Enter Problem"
            className="w-full px-4 py-2 pr-10 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            {
              id: "faq1",
              question: "How can I register new information?",
              answer:
                'To register new information and create a new entry, we will need a new entry password and email address. navigate to the "Information Management" section in your dashboard and click on "Add New". Fill out the required fields and submit the form.After this you will have to login again.',
            },
            {
              id: "faq2",
              question:
                "How can I make flight records and watch live-flight in real life? ",
              answer:
                'Flight records can be created in the "Flight Management" section by the pilots and stored in the database bu the admin of the shipping system. Click on "New Flight Record", enter the flight details including date, time, and route information, then save your entry.',
            },
            {
              id: "faq3",
              question:
                "What is the procedure for uploading the report?. How can we make a report for all the procedures? ",
              answer:
                'To upload a report, go to the "Reports" section, select "Upload Report", choose the file from your device, add any necessary comments or tags, and click "Submit".',
            },
            {
              id: "faq4",
              question: "Who should I contact for technical support?",
              answer:
                "For technical support, please contact our support team at support@example.com or call our helpline at (123) 456-7890. Our team is available Monday through Friday, 9 AM to 5 PM EST.",
            },
            {
              id: "faq5",
              question: "How can I change my password?.",
              answer:
                "To change your password, Please contact the head office to change your password. We will request a permissions in your gmail to change the password for your related account.",
            },
            {
              id: "faq6",
              question:
                "Can i get a refund and cashback for the errors that drones and ships will make in near future?",
              answer:
                "Yes, we will provide a refund and cashback for the errors that drones and ships will make in near future. We will take the full responsibility and we will notify the insurance company that associated with the shipping company.",
            },
          ].map((faq) => (
            <div
              key={faq.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                className="flex justify-between items-center w-full py-4 text-left text-sm font-normal"
                onClick={() => toggleAccordion(faq.id)}
              >
                {faq.question}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeAccordion === faq.id ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeAccordion === faq.id && (
                <div className="pb-4 text-sm text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-6">Go ahead and ask!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-gray-600">
            Name
          </label>
          <select
            id="name"
            {...register("name", { required: "Please select a user" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select User</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
            <option value="alex">Alex Johnson</option>
          </select>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-600">
            E-mail
          </label>
          <select
            id="email"
            {...register("email", { required: "Please select an email" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Please Select</option>
            <option value="john@example.com">john@example.com</option>
            <option value="granny@example.com">granny@example.com</option>
            <option value="henry@example.com">henry@example.com</option>
            <option value="gigi@example.com">gigi@example.com</option>
          </select>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="topic" className="text-sm text-gray-600">
          Topic
        </label>
        <input
          id="topic"
          type="text"
          placeholder="Please Enter"
          {...register("topic", { required: "Topic is required" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.topic && <p className="text-red-500 text-sm">{errors.topic.message}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="text" className="text-sm text-gray-600">
          Text
        </label>
        <textarea
          id="text"
          placeholder="Please Enter"
          rows={3}
          {...register("text", { required: "Please enter some text" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-8 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition duration-300"
        >
          Send
        </button>
      </div>
    </form>
      </div>
    </div>
  )
}

export default HelpCenter