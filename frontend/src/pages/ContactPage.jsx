import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary-600 text-lg mb-2">Get In Touch</p>
            <h1 className="text-4xl font-serif text-gray-800 mb-8">Contact Us</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl text-gray-800 mb-2">Phone number</h3>
                <p className="text-gray-600">+91-9161-110-130</p>
              </div>

              <div>
                <h3 className="text-xl text-gray-800 mb-2">Send Email</h3>
                <p className="text-gray-600">support@raysveda.com</p>
              </div>

              <div>
                <h3 className="text-xl text-gray-800 mb-2">Address</h3>
                <p className="text-gray-600">
                  11/13/4C, Tashkand Marg, Civil Lines, Allahabad,<br />
                  Uttar Pradesh, India - 211001
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">Drop Us a Line</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-2 rounded-md border-none"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-2 rounded-md border-none"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md border-none"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="5"
                  className="w-full px-4 py-2 rounded-md border-none"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-32 bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors duration-300 float-right"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage