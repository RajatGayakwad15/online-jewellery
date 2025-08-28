// import React from "react";

const Term = () => {
  return (
    <div className="container my-5">
      {/* Centered Gradient Heading */}
      <h2 className="text-4xl mb-4 text-center font-bold tracking-tight lg:text-5xl">
        Terms{" "}
        <span className="from-accent-foreground to-primary bg-gradient-to-r bg-clip-text text-transparent">
          & Conditions
        </span>
      </h2>

      <p className=" mb-5">
        This Terms of Service Agreement (“Agreement”) governs your use of the{" "}
        <strong>Shreesha</strong> Glossary website. By accessing or using our
        website, you agree to comply with and be bound by these Terms &
        Conditions. If you do not agree, please discontinue use of the website.
      </p>

      <div className="text-start">
        <h4 className="mt-4">1. Acceptance of Terms</h4>
        <p>
          By accessing or using our glossary website, you acknowledge that you
          have read, understood, and agree to these Terms & Conditions.
        </p>

        <h4 className="mt-4">2. Content Accuracy</h4>
        <p>
          We strive to ensure that all glossary terms and definitions are
          accurate and up to date. However, <strong>Shreesha</strong> does not
          guarantee that all content will be free from errors, omissions, or
          inaccuracies.
        </p>

        <h4 className="mt-4">3. Use of Website</h4>
        <ul className="list-disc ps-4">
          <li>
            You may use this website for personal, educational, and
            non-commercial purposes only.
          </li>
          <li>
            You agree not to misuse the website by attempting to hack, disrupt,
            or harm its functionality.
          </li>
          <li>
            Unauthorized use of content, including copying or redistribution, is
            prohibited unless prior written permission is obtained.
          </li>
        </ul>

        <h4 className="mt-4">4. Intellectual Property</h4>
        <p>
          All glossary terms, website content, logos, and designs are the
          property of <strong>Shreesha</strong> and are protected under
          applicable copyright laws. You may not reproduce or distribute content
          without permission.
        </p>

        <h4 className="mt-4">5. Third-Party Links</h4>
        <p>
          Our website may include links to third-party websites. We are not
          responsible for the content, policies, or practices of these external
          websites.
        </p>

        <h4 className="mt-4">6. Limitation of Liability</h4>
        <p>
          <strong>Shreesha</strong> is not liable for any indirect, incidental,
          or consequential damages arising out of your use of the glossary
          website, including reliance on the accuracy of content.
        </p>

        <h4 className="mt-4">7. Modifications to Terms</h4>
        <p>
          We may update or modify these Terms & Conditions at any time. Updated
          terms will be posted on this page with a revised “Last Updated” date.
          Continued use of the website constitutes acceptance of the changes.
        </p>

        <h4 className="mt-4">8. Governing Law</h4>
        <p>
          These Terms & Conditions are governed by the laws of India. Any
          disputes shall be subject to the exclusive jurisdiction of the courts
          in Kolhapur, India.
        </p>

        <p className="mt-5">
          For questions regarding these Terms & Conditions, please contact us at{" "}
          <strong>support@shreesha.in</strong>.
        </p>
      </div>
    </div>
  );
};

export default Term;
