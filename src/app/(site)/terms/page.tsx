import { ScrollText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-industrial-100 rounded-full mb-6 text-industrial-900">
            <ScrollText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xl text-industrial-500 max-w-2xl mx-auto">
            Governing the sale of goods and services by PIF Packaging.
          </p>
          <p className="text-sm text-industrial-400 mt-4">
            Last Updated: January 11, 2026
          </p>
        </div>

        <div className="prose prose-lg prose-industrial mx-auto text-industrial-600">
          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              1. Acceptance of Orders
            </h3>
            <p>
              All orders are subject to acceptance by PIF Packaging ("Seller")
              at its principal place of business. Possession of a price list or
              quotation shall not strictly constitute an offer to sell. Seller
              reserves the right to reject any order for any reason.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              2. Pricing & Payment Terms
            </h3>
            <p>
              Unless otherwise agreed in writing, prices are F.O.B. Seller's
              shipping point. Prices are subject to change without notice due to
              fluctuations in raw material costs (resin, glass, aluminum).
              Payment terms are Net 30 days from invoice date for approved
              credit accounts.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              3. Custom Tooling & Molds
            </h3>
            <p>
              Usage of custom molds is contingent upon the Customer's
              fulfillment of amortization agreements. Seller retains title to
              all tooling, molds, and dies unless fully paid for by Customer and
              released in writing. Seller assumes no liability for the life of
              molds beyond their standard cycle rating.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              4. Limited Warranty
            </h3>
            <p>
              Seller warrants that goods sold hereunder shall be free from
              defects in material and workmanship at the time of shipment.
              <strong>
                {" "}
                THIS WARRANTY IS IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR
                IMPLIED, INCLUDING MERCHANTABILITY OR FITNESS FOR A PARTICULAR
                PURPOSE.
              </strong>
            </p>
            <p className="mt-4">
              Customer is solely responsible for testing product compatibility
              with Seller's packaging containers. Seller does not guarantee
              chemical compatibility or permeation rates.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              5. Returns & Claims
            </h3>
            <p>
              Claims for shortages or defective goods must be made within ten
              (10) days of receipt. No goods may be returned without Seller's
              prior written authorization (RMA). Custom-manufactured items are
              non-returnable unless proven defective.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-industrial-900 font-bold uppercase tracking-wider mb-4">
              6. Force Majeure
            </h3>
            <p>
              Seller shall not be liable for delays in delivery or failure to
              perform due to causes beyond its reasonable control, including but
              not limited to acts of God, supply chain disruptions, port
              strikes, or raw material shortages.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
