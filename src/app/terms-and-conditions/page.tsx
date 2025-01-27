  import Link from "next/link";

export default async function Component() {
  return (
    <>
      <div className="max-w-7xl bg-white rounded container mx-auto px-4 py-8 mt-6">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="space-y-6 ml-4">
          <section>
            <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
            <p className="ml-3 mb-4 text-sm">
              This is not the official EISN website. This is just a skin on top
              of the EISN that aims to provide an enhanced user experience while
              maintaining full compatibility with existing systems. All requests
              are redirected back to the official infrastructure. We are not
              responsible for any issues arising from the use of this service.
              For core functionality, {"it's"} recommended to use the{" "}
              <Link
                href="https://eis.cdot.in"
                className="text-blue-600 hover:underline"
              >
                official EIS website
              </Link>
              . The service is provided {'"as is"'} without any warranties of
              any kind, either express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="ml-3 text-sm">
              By accessing or using this website, you agree to be bound by these
              Terms and Conditions. These terms constitute a legally binding
              agreement between you and the service provider. If you do not
              agree with any part of these terms, you must not use this service.
              Your continued use of the service following any modifications to
              these terms constitutes your acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Description of Service
            </h2>
            <p className="ml-3 text-sm">
              This website provides an alternative interface for accessing EISN
              services. It does not replace or supersede the official EISN
              website. The service includes enhanced user interface elements,
              improved navigation, and optimized workflows while maintaining
              complete compatibility with existing EISN infrastructure. All core
              data processing and storage remains on official EISN servers. The
              service may include certain automatic optimizations, caching
              mechanisms, and temporary data storage designed to improve
              performance and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Limitation of Liability
            </h2>
            <p className="ml-3 text-sm">
              We are not liable for any damages or losses resulting from your
              use of this service, including but not limited to direct,
              indirect, incidental, punitive, and consequential damages. This
              includes any damages or losses arising from: (a) errors, mistakes,
              or inaccuracies in the service; (b) personal injury or property
              damage resulting from your access to or use of the service; (c)
              unauthorized access to or use of our systems; (d) interruption or
              cessation of transmission to or from the service; (e) bugs,
              viruses, trojan horses, or the like that may be transmitted
              through the service; and/or (f) errors or omissions in any content
              or data loss.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. User Responsibilities
            </h2>
            <p className="ml-3 text-sm">
              You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account. You agree to: (a) immediately notify us of any
              unauthorized use of your account or any other breach of security;
              (b) ensure that you exit from your account at the end of each
              session when accessing the service from a shared computer; (c) not
              share your login credentials with any third party; (d) ensure that
              any information you provide is accurate and complete; and (e)
              comply with all applicable laws and regulations while using the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Modifications to Service
            </h2>
            <p className="ml-3 text-sm">
              We reserve the right to modify or discontinue this service at any
              time without notice. This includes, but is not limited to: (a)
              making changes to the user interface; (b) adding or removing
              features; (c) updating security protocols; (d) implementing
              performance improvements; and (e) conducting maintenance or
              updates. We shall not be liable to you or any third party for any
              modification, suspension, or discontinuance of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Privacy Policy and Data Handling
            </h2>
            <p className="ml-3 text-sm">
              We do not store or process any {"user's"} private data as plain
              text locally. However, to optimize performance and provide a
              seamless user experience, certain data elements including
              authentication credentials may be temporarily stored in encrypted
              format using industry-standard security protocols. This temporary
              storage is implemented using secure methods and is automatically
              cleared upon session termination. All requests are redirected to
              the official EISN servers, and primary data handling is subject to{" "}
              {"EISN's"} privacy policy. The temporary storage mechanism employs
              encryption at rest and in transit, with automatic expiration and
              secure cleanup procedures. Users acknowledge that this temporary
              storage is essential for maintaining session continuity and
              improving service responsiveness. We implement appropriate
              technical and organizational measures to protect against
              unauthorized access, alteration, disclosure, or destruction of
              temporary data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Security Measures</h2>
            <p className="ml-3 text-sm">
              While we implement reasonable security measures to protect user
              data and maintain service integrity, no method of transmission
              over the internet or electronic storage is 100% secure. We cannot
              guarantee absolute security but employ industry-standard practices
              including encryption, secure protocols, and regular security
              audits. Users are encouraged to take appropriate precautions when
              accessing the service, particularly from shared or public devices.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
