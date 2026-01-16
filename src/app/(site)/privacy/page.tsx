import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-industrial-100 rounded-full mb-6 text-industrial-900">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-industrial-500 max-w-2xl mx-auto">
            How we collect, use, and protect your data.
          </p>
          <p className="text-sm text-industrial-400 mt-4">
            Last Updated: January 11, 2026
          </p>
        </div>

        <div className="prose prose-lg prose-industrial mx-auto text-industrial-600">
          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              1. Information We Collect
            </h3>
            <p>
              We collect information that identifies, relates to, describes,
              references, is capable of being associated with, or could
              reasonably be linked, directly or indirectly, with a particular
              consumer or device ("personal information"). This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Identifiers:</strong> Real name, postal address, unique
                personal identifier, online identifier, IP address, email
                address, or account name.
              </li>
              <li>
                <strong>Commercial Information:</strong> Records of personal
                property, products or services purchased, obtained, or
                considered.
              </li>
              <li>
                <strong>Internet Activity:</strong> Browsing history, search
                history, and information regarding a consumer's interaction with
                our website.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              2. Use of Information
            </h3>
            <p>
              We may use or disclose the personal information we collect for one
              or more of the following business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                To fulfill or meet the reason for which the information is
                provided (e.g., to process a quote or order).
              </li>
              <li>
                To provide you with email alerts, event registrations, and other
                notices concerning our products or services.
              </li>
              <li>To improve our website and present its contents to you.</li>
              <li>
                To carry out our obligations and enforce our rights arising from
                any contracts entered into between you and us.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              3. Data Security
            </h3>
            <p>
              We have implemented measures designed to secure your personal
              information from accidental loss and from unauthorized access,
              use, alteration, and disclosure. All information you provide to us
              is stored on our secure servers behind firewalls.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              4. Contact Information
            </h3>
            <p>
              If you have any questions or comments about this notice, the ways
              in which we collect and use your personal information, your
              choices and rights regarding such use, please do not hesitate to
              contact us at:
            </p>
            <div className="bg-industrial-50 p-6 rounded-lg mt-4 border border-industrial-100">
              <p className="font-bold text-industrial-900">
                PIF Packaging Compliance
              </p>
              <p>Email: legal@pifpackaging.com</p>
              <p>Phone: 1-800-PIF-PACK</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
