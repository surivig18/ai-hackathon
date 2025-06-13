import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I send money to someone?",
      answer: "To send money, go to the 'Send Money' section, enter the recipient's email or phone number, specify the amount, and confirm the transaction. The money will be transferred instantly."
    },
    {
      question: "What fees does WalletPay charge?",
      answer: "WalletPay charges a 2.5% fee for sending money. Receiving money is always free. Bank transfers and card additions may have additional fees depending on your bank."
    },
    {
      question: "How long do transactions take?",
      answer: "Most transactions are processed instantly. Bank transfers may take 1-3 business days depending on your bank. International transfers may take longer."
    },
    {
      question: "Is my money secure with WalletPay?",
      answer: "Yes, your money is protected with bank-level security, encryption, and fraud monitoring. We're also FDIC insured up to $250,000."
    },
    {
      question: "How do I add money to my wallet?",
      answer: "You can add money by linking your bank account or debit card. Go to your dashboard and click 'Add Money' to get started."
    },
    {
      question: "Can I cancel a transaction?",
      answer: "You can cancel pending transactions. Once a transaction is completed, it cannot be cancelled, but you can request the recipient to send the money back."
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "Click 'Forgot Password' on the login page and we'll send you a reset link via email. Make sure to check your spam folder."
    },
    {
      question: "How do I enable two-factor authentication?",
      answer: "Go to Settings > Security and toggle on 'Two-Factor Authentication'. You'll need to verify your phone number to complete the setup."
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email",
      action: "Send Email",
      available: "Response in 2-4 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our support line",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM"
    }
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using WalletPay",
      icon: FileText
    },
    {
      title: "Security Best Practices",
      description: "Keep your account safe and secure",
      icon: HelpCircle
    },
    {
      title: "API Documentation",
      description: "For developers integrating with WalletPay",
      icon: ExternalLink
    },
    {
      title: "Terms of Service",
      description: "Our terms and conditions",
      icon: FileText
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-500 mt-2">Find answers to your questions and get the help you need</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for help topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{method.description}</p>
              <p className="text-xs text-gray-500 mb-4">{method.available}</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {method.action}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {expandedFaq === index && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No FAQ found matching your search.</p>
            <p className="text-sm text-gray-400 mt-1">Try different keywords or contact support directly.</p>
          </div>
        )}
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Helpful Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href="#"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="bg-blue-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
        <p className="text-gray-600 mb-4">
          Can't find what you're looking for? Our support team is here to help you 24/7.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}