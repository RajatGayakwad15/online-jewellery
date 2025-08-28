// import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container my-5">
      {/* Centered Heading with Gradient */}
      <h2 className="text-4xl mb-4 text-center font-bold tracking-tight lg:text-5xl">
        Privacy{" "}
        <span className="from-accent-foreground to-primary bg-gradient-to-r bg-clip-text text-transparent">
          Policy
        </span>
      </h2>

      <p className=" mb-5">
        At <strong>Shreesha</strong>, we value your trust and are committed to
        protecting your personal information. This Privacy Policy outlines how
        we collect, use, and safeguard your data when you visit our website or
        use our glossary services.
      </p>

      <div className="text-start">
        <h4 className="mt-4">1. Information We Collect</h4>
        <ul className="list-disc ps-4">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and other details provided during sign-ups, inquiries, or
            purchases.
          </li>
          <li>
            <strong>Technical Information:</strong> IP address, browser type,
            device data, and analytics collected via cookies or third-party
            tools.
          </li>
          <li>
            <strong>Usage Information:</strong> Search history, bookmarked
            glossary terms, preferences, and interactions on our website.
          </li>
          <li>
            <strong>Communication Records:</strong> Emails, contact form
            submissions, or customer support interactions.
          </li>
        </ul>

        <h4 className="mt-4">2. How We Use Your Information</h4>
        <ul className="list-disc ps-4">
          <li>To provide access to glossary content and website features.</li>
          <li>To respond to queries, support requests, or feedback.</li>
          <li>
            To share updates about new glossary terms, features, or
            announcements.
          </li>
          <li>To analyze and improve website performance and user experience.</li>
        </ul>

        <h4 className="mt-4">3. Information Sharing</h4>
        <p>
          We do not sell or rent your personal information. Your data may be
          shared only with:
        </p>
        <ul className="list-disc ps-4">
          <li>
            <strong>IT & Hosting Services:</strong> To maintain and secure our
            website.
          </li>
          <li>
            <strong>Analytics Providers:</strong> To track and improve website
            performance.
          </li>
          <li>
            <strong>Legal Authorities:</strong> If required under applicable
            Indian laws.
          </li>
        </ul>

        <h4 className="mt-4">4. Data Security</h4>
        <ul className="list-disc ps-4">
          <li>Secure Socket Layer (SSL) encryption.</li>
          <li>Firewall and malware protection.</li>
          <li>Regular audits and restricted access to data.</li>
        </ul>
        <p>
          While we strive to protect your data, no method of transmission over
          the internet is 100% secure.
        </p>

        <h4 className="mt-4">5. Cookies and Tracking Technologies</h4>
        <p>Our website uses cookies to:</p>
        <ul className="list-disc ps-4">
          <li>Remember your preferences.</li>
          <li>Improve browsing and search experience.</li>
          <li>Collect anonymous analytics for performance insights.</li>
        </ul>
        <p>You may disable cookies anytime through your browser settings.</p>

        <h4 className="mt-4">6. Your Rights</h4>
        <ul className="list-disc ps-4">
          <li>Request access to your personal data.</li>
          <li>Update or correct your information.</li>
          <li>Request deletion of your data (subject to legal obligations).</li>
          <li>Opt-out of marketing or notification emails.</li>
        </ul>
        <p>
          To exercise these rights, contact us at:{" "}
          <strong>support@shreesha.in</strong>
        </p>

        <h4 className="mt-4">7. Changes to This Policy</h4>
        <p>
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page with a revised “Last Updated” date. Your continued
          use of our services means you accept these changes.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
