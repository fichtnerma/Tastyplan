import React from 'react';
import Link from 'next/link';

function Settings() {
    return (
        <div className="p-6 md:p-14 md:pt-36">
            <h1>Settings</h1>
            <div className="block md:hidden">
                <div className="mb-10">
                    <h2>HELP</h2>
                    <Link href="/help/questions">
                        <p>Q&A</p>
                    </Link>
                    {/* <Link href="/help/contact">
                                        <p>Contact</p>
                                    </Link> */}
                </div>
                <div className="mb-10">
                    <h2>Company</h2>
                    <Link href="/company/aboutUs">
                        <p>About us</p>
                    </Link>
                </div>
                <div className="mb-10">
                    <h2>Legal</h2>
                    {/* <Link href="/legal/conditions">
                                        <p>Conditions</p>
                                    </Link> */}
                    <Link href="/legal/privacy">
                        <p>Privacy Policy</p>
                    </Link>
                    <Link href="/legal/impressum">
                        <p>Imprint</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Settings;
