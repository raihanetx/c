import React from 'react';
import { PageTitle } from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/icons';

interface InfoPageProps {
  title: string;
  children: React.ReactNode;
}

export const InfoPageLayout: React.FC<InfoPageProps> = ({ title, children }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 min-h-screen">
       <Link
        to="/"
        className="mb-6 inline-flex items-center text-sm font-medium text-[#8F87F1] hover:text-opacity-80 hover:text-[#8F87F1] transition-colors" // hover:text-[#7c71d0] to hover:text-opacity-80 hover:text-[#8F87F1]
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
      <PageTitle title={title} />
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl prose prose-gray max-w-none prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-3 prose-p:mb-3 prose-ul:list-disc prose-ul:ml-5 prose-li:mb-1 prose-a:text-[#8F87F1] hover:prose-a:text-opacity-80 hover:prose-a:text-[#8F87F1]"> {/* prose-slate to prose-gray, hover:prose-a:text-[#7c71d0] to hover:prose-a:text-opacity-80 hover:prose-a:text-[#8F87F1] */}
        {children}
      </div>
    </div>
  );
};

export const AboutUsPage: React.FC = () => (
  <InfoPageLayout title="About Us">
    <p>Welcome to THINK PLUS BD, your premier destination for high-quality digital products and services. We are passionate about providing innovative solutions that empower individuals and businesses in the digital age.</p>
    <p>Our mission is to offer a curated selection of courses, software, subscriptions, and e-books that deliver exceptional value and help our customers achieve their goals. We believe in the power of knowledge and technology to transform lives and industries.</p>
    <h2>Our Values</h2>
    <ul>
      <li><strong>Quality:</strong> We are committed to offering products and services that meet the highest standards of excellence.</li>
      <li><strong>Customer Focus:</strong> Our customers are at the heart of everything we do. We strive to provide outstanding support and a seamless experience.</li>
      <li><strong>Innovation:</strong> We continuously seek out and develop cutting-edge digital solutions.</li>
      <li><strong>Integrity:</strong> We conduct our business with honesty and transparency.</li>
    </ul>
    <p>Thank you for choosing THINK PLUS BD. We look forward to serving you!</p>
  </InfoPageLayout>
);

export const TermsPage: React.FC = () => (
  <InfoPageLayout title="Terms & Conditions">
    <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the THINK PLUS BD website (the "Service") operated by THINK PLUS BD ("us", "we", or "our").</p>
    <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
    <h2>Purchases</h2>
    <p>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your name, email, and payment information.</p>
    <h2>Content</h2>
    <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
    <h2>Changes</h2>
    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
    <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
  </InfoPageLayout>
);

export const PrivacyPolicyPage: React.FC = () => (
  <InfoPageLayout title="Privacy Policy">
    <p>THINK PLUS BD ("us", "we", or "our") operates the THINK PLUS BD website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
    <h2>Information Collection and Use</h2>
    <p>We collect several different types of information for various purposes to provide and improve our Service to you. Types of Data Collected include Personal Data (e.g. email address, name, phone number, usage data).</p>
    <h2>Use of Data</h2>
    <p>THINK PLUS BD uses the collected data for various purposes: to provide and maintain the Service; to notify you about changes to our Service; to allow you to participate in interactive features of our Service when you choose to do so; to provide customer care and support; to provide analysis or valuable information so that we can improve the Service; to monitor the usage of the Service; to detect, prevent and address technical issues.</p>
    <h2>Security of Data</h2>
    <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
  </InfoPageLayout>
);

export const RefundPolicyPage: React.FC = () => (
  <InfoPageLayout title="Refund Policy">
    <p>At THINK PLUS BD, we strive to ensure our customers are satisfied with their purchases. Due to the digital nature of our products (courses, software, subscriptions, e-books), our refund policy is as follows:</p>
    <h2>General Policy</h2>
    <p>All sales of digital products are final. We generally do not offer refunds once a product has been accessed, downloaded, or used. This is because digital products are delivered instantly and cannot be "returned" in the traditional sense.</p>
    <h2>Exceptions</h2>
    <p>We may consider refunds in the following specific circumstances, at our sole discretion:</p>
    <ul>
      <li><strong>Product Not Delivered:</strong> If you paid for a product but did not receive access to it due to a technical issue on our end that we cannot resolve within a reasonable timeframe.</li>
      <li><strong>Major Defects:</strong> If a product has significant defects that prevent its core functionality and we are unable to provide a fix or a working alternative. This does not include minor bugs or compatibility issues with specific, non-standard user setups.</li>
      <li><strong>Misrepresentation:</strong> If the product was clearly and significantly misrepresented in its description on our website at the time of purchase.</li>
    </ul>
    <h2>How to Request a Refund</h2>
    <p>If you believe you qualify for a refund based on the exceptions above, please contact our support team at {CONTACT_INFO_LOCAL.email} within 7 days of your purchase. You will need to provide your order details and a clear explanation of the issue.</p>
    <p>We will review your request and notify you of our decision. If a refund is approved, it will be processed to your original method of payment within a certain number of days.</p>
    <h2>Subscription Cancellations</h2>
    <p>For subscription-based products, you can cancel your subscription at any time to prevent future charges. However, we do not offer prorated refunds for the current billing period once it has begun, unless otherwise required by law or specified in the subscription terms.</p>
    <p>We reserve the right to modify this refund policy at any time. Any changes will be posted on this page.</p>
  </InfoPageLayout>
);

// Helper constant for contact info within this file
const CONTACT_INFO_LOCAL = { 
  email: "support@thinkplusbd.com",
};