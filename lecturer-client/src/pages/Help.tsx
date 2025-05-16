
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, MessageCircle, AlertTriangle } from 'lucide-react';
import { troubleshootingGuides } from '@/data/mockData';

const GuideSteps: React.FC<{steps: string[]}> = ({ steps }) => {
  return (
    <ol className="space-y-2 list-decimal list-inside">
      {steps.map((step, index) => (
        <li key={index} className="text-gray-700">{step}</li>
      ))}
    </ol>
  );
};

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: "How do I add a new IoT device to the campus network?",
      answer: "New devices need to be registered through the Devices page. Click on 'Add Device' and follow the step-by-step wizard. Make sure you have the device MAC address and serial number available."
    },
    {
      question: "What should I do if a device is showing as offline?",
      answer: "First, check physical power to the device. Then verify network connectivity in the area. You can try restarting the device or resetting network settings. If problems persist, refer to our troubleshooting guide for offline devices."
    },
    {
      question: "How often does the system update sensor data?",
      answer: "Sensor data is updated at different intervals depending on the device type. Temperature sensors update every 5 minutes, motion sensors update in real-time, and air quality sensors update every 15 minutes."
    },
    {
      question: "Can I schedule automated actions for devices?",
      answer: "Yes, automated actions can be configured in the Devices section. Select the device you want to automate, click on 'Automation' and create rules based on time, sensor values, or other triggers."
    },
    {
      question: "How do I export data for analysis?",
      answer: "On the Dashboard, click the export button in the top-right corner of any chart. You can select date ranges and export formats (CSV, JSON, or Excel). For API access to raw data, please contact the IT department."
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredGuides = troubleshootingGuides.filter(
    guide => guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             guide.steps.some(step => step.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-campus-slate">Help & Support</h1>
      
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search help articles, troubleshooting guides, or FAQs..."
          className="pl-10 py-6 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-campus-blue" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Common questions and answers about the Smart Campus system</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No FAQs match your search. Try different keywords.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-campus-blue" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Need personal assistance? We're here to help!</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Campus IT Support:</p>
                  <p className="text-sm">support@smartcampus.edu</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                </div>
                <Button className="w-full">Start a Chat</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-campus-blue" />
                Troubleshooting Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredGuides.length > 0 ? (
                filteredGuides.map(guide => (
                  <div key={guide.id} className="space-y-2">
                    <h3 className="font-medium">{guide.title}</h3>
                    <Badge variant="outline" className="bg-gray-100">Step-by-step</Badge>
                    <GuideSteps steps={guide.steps} />
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No guides match your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
