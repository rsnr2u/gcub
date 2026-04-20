<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class OurServicesSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'title' => 'Mobile Banking',
                'slug' => 'mobile-banking',
                'excerpt' => 'Bank on the go with our secure and user-friendly mobile banking app.',
                'content' => '
                    <div class="mb-10">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">Experience Banking at Your Fingertips</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            GCUB Mobile Banking offers you a safe, convenient, and easy way to manage your finances from your smartphone. Whether you need to check your balance, transfer funds, or pay bills, our app is designed to make banking simple.
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                            <div class="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <h3>Highly Secure</h3>
                                <p>Advanced encryption and binary security to keep your transactions safe.</p>
                            </div>
                            <div class="p-6 bg-green-50 rounded-2xl border border-green-100">
                                <h3>Instant Transfers</h3>
                                <p>Send money to any bank account instantly using IMPS or NEFT.</p>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-8">
                        <h3 class="text-xl font-bold text-blue-900">Key Features</h3>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li><strong>Balance Inquiry:</strong> Real-time update of your account balance.</li>
                            <li><strong>Mini Statement:</strong> View recent transaction history instantly.</li>
                            <li><strong>Fund Transfer:</strong> Within bank or to any other bank accounts.</li>
                            <li><strong>Bill Payments:</strong> Pay utility bills, mobile recharges, and more.</li>
                        </ul>
                    </div>
                    <div class="mt-16 bg-slate-900 rounded-3xl p-8 text-white">
                        <h2>Download Our App Now</h2>
                        <p>Available on both Android and iOS devices. Start your mobile banking journey today.</p>
                        <p><a href="https://play.google.com/store/apps/details?id=app.imps.guntur_new" class="text-blue-400">Google Play Store</a> | <a href="https://apps.apple.com/in/app/guntur-urban-mobile-banking/id1608340285" class="text-blue-400">Apple App Store</a></p>
                    </div>',
                'status' => 'active',
                'meta_title' => 'Mobile Banking - Secure Banking on the Go | GCUB',
                'meta_description' => 'Access your accounts anywhere, anytime with GCUB Mobile Banking App. Transfer funds, pay bills, and more securely.',
                'meta_keywords' => 'mobile banking, banking app, fund transfer, gcub app'
            ],
            [
                'title' => 'ATM Services',
                'slug' => 'atm-services',
                'excerpt' => 'Experience 24/7 convenience with our state-of-the-art ATM network.',
                'content' => '
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">Banking at Your Convenience</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            With the GCUB ATM network, you don\'t need to visit a branch for your basic banking needs. Our ATMs are strategically located and provide a range of services beyond just cash withdrawal.
                        </p>
                    </div>
                    <div class="space-y-10">
                        <h3>Features & Facilities</h3>
                        <ul>
                            <li>Cash Withdrawal (Own & Other Bank)</li>
                            <li>Balance Inquiry</li>
                            <li>Mini Statement</li>
                            <li>PIN Change Facility</li>
                        </ul>
                        <div class="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                            <h3>ATM Security Tips</h3>
                            <ul>
                                <li>Keep your PIN secret. Never write it on your card or share it.</li>
                                <li>Shield the keypad while entering your PIN.</li>
                                <li>Be wary of strangers offering help at the ATM.</li>
                                <li>Check for any suspicious attachments on the card slot.</li>
                            </ul>
                        </div>
                    </div>',
                'status' => 'active',
                'meta_title' => 'ATM Services - 24/7 Cash Access | GCUB',
                'meta_description' => 'Our wide network of ATMs ensures you have access to cash whenever you need it. Secure, fast, and accessible 24/7.',
                'meta_keywords' => 'ATM, cash withdrawal, gcub atm, banking convenience'
            ],
            [
                'title' => 'Toll Free Banking',
                'slug' => 'toll-free-banking',
                'excerpt' => 'Your direct connection to our customer care team, absolutely free.',
                'content' => '
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">Assistance Around the Clock</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            We value your time and convenience. Our Toll Free Banking service allows you to get help with your banking queries, report lost cards, and get information on our latest products without any call charges.
                        </p>
                        <div class="bg-slate-50 p-10 rounded-[32px] border border-slate-100 text-center">
                            <h3>Our Dedicated Helpline</h3>
                            <p class="text-4xl font-black text-blue-900">1800 425 8873</p>
                            <p>Available 24x7 | 365 Days a Year</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3>Services Offered</h3>
                            <ul>
                                <li>Account Balance Inquiry</li>
                                <li>Recent Transaction Details</li>
                                <li>Cheque Book Request</li>
                                <li>Stop Payment of Cheques</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-red-700">Emergency Services</h3>
                            <ul>
                                <li>Block ATM / Debit Card</li>
                                <li>Reporting Unauthorized Transactions</li>
                                <li>Fraud Alert Reporting</li>
                            </ul>
                        </div>
                    </div>',
                'status' => 'active',
                'meta_title' => 'Toll Free Banking - 24/7 Helpline | GCUB',
                'meta_description' => 'Our dedicated toll-free helpline ensures you have access to banking support whenever you need it. Call us for any assistance.',
                'meta_keywords' => 'toll free banking, customer care, gcub helpline'
            ],
            [
                'title' => 'E-Statements',
                'slug' => 'e-statements',
                'excerpt' => 'Receive your bank statements securely in your email. Fast, free, and eco-friendly.',
                'content' => '
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">Switch to Digital Statements</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            E-Statement is an electronic version of your bank statement, delivered as a PDF to your registered email address. It’s exactly the same as the paper statement you receive via mail, but without the clutter and delay.
                        </p>
                    </div>
                    <div class="space-y-12">
                        <h3>Benefits of E-Statements</h3>
                        <ul>
                            <li><strong>Eco-Friendly:</strong> Reduce paper waste and save trees.</li>
                            <li><strong>Instant Delivery:</strong> Get statements as soon as they\'re generated.</li>
                            <li><strong>Secure Storage:</strong> Password-protected and safely archived.</li>
                            <li><strong>Completely Free:</strong> Zero cost and skip postal charges.</li>
                        </ul>
                    </div>',
                'status' => 'active',
                'meta_title' => 'E-Statements - Go Paperless | GCUB',
                'meta_description' => 'Subscribe to E-Statements and receive your account statements directly in your inbox. Eco-friendly, secure, and fast.',
                'meta_keywords' => 'e-statements, digital statements, paperless banking, gcub e-statement'
            ],
            [
                'title' => 'Positive Pay System',
                'slug' => 'positive-pay-system',
                'excerpt' => 'Adding an extra layer of security to your high-value check payments.',
                'content' => '
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">What is Positive Pay System (PPS)?</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            Positive Pay System is a process of reconfirming key details of high-value cheques. This involves the drawer of the cheque submitting certain minimum details—such as date, name of beneficiary, and amount—to the bank.
                        </p>
                    </div>
                    <div class="bg-blue-50 border-l-8 border-blue-900 p-8 rounded-r-3xl mb-12">
                        <h3>Eligibility</h3>
                        <p>PPS is applicable for all cheques of <strong>₹ 50,000 and above</strong>.</p>
                    </div>
                    <div class="space-y-12">
                        <h3>Information Required for PPS</h3>
                        <ul>
                            <li>Cheque Number</li>
                            <li>Cheque Date</li>
                            <li>Cheque Amount</li>
                            <li>Beneficiary Name</li>
                        </ul>
                    </div>',
                'status' => 'active',
                'meta_title' => 'Positive Pay System (PPS) - Secure Check Payments | GCUB',
                'meta_description' => 'Enhanced security for your high-value cheque payments with GCUB Positive Pay System. Prevent fraud and ensure safe clearing.',
                'meta_keywords' => 'positive pay system, check security, gcub pps, cheque fraud prevention'
            ],
            [
                'title' => 'Any Branch Banking',
                'slug' => 'any-branch-banking',
                'excerpt' => 'Your bank, everywhere you go. Transact seamlessly from any of our networked branches.',
                'content' => '
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">Banking without Boundaries</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            Any Branch Banking (ABB) is a facility that allows you to operate your account from any of our networked branches across the country. You are no longer restricted to just your home branch for your daily banking needs.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div class="p-8 bg-blue-50 rounded-3xl">
                            <h3>Key Facilities</h3>
                            <ul>
                                <li>Cash Deposit at any branch</li>
                                <li>Cash Withdrawal (Self only)</li>
                                <li>Funds Transfer across branches</li>
                                <li>Statement of Account</li>
                                <li>Submission of KYC documents</li>
                            </ul>
                        </div>
                    </div>',
                'status' => 'active',
                'meta_title' => 'Any Branch Banking (ABB) - Bank Anywhere | GCUB',
                'meta_description' => 'Operate your account from any of our networked branches with GCUB Any Branch Banking service. Experience true flexibility.',
                'meta_keywords' => 'any branch banking, abb, flexible banking, networked branches'
            ],
            [
                'title' => 'APBS Service',
                'slug' => 'apbs-service',
                'excerpt' => 'Aadhaar Payment Bridge System for seamless disbursement of government benefits.',
                'content' => '
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">What is Aadhaar Payment Bridge (APB) System?</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            Aadhaar Payment Bridge (APB) System, implemented by NPCI, is a unique payment system that uses Aadhaar number as a central key for electronically channeling government subsidies and benefits in the Aadhaar Linked Bank Accounts (ALBA) of the beneficiaries.
                        </p>
                    </div>
                    <div class="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                        <h3>Key Objectives</h3>
                        <ul>
                            <li>To digitize benefit disbursement processes.</li>
                            <li>To promote financial inclusion among the rural population.</li>
                            <li>To ensure transparency in government payouts.</li>
                        </ul>
                    </div>',
                'status' => 'active',
                'meta_title' => 'APBS Service - Aadhaar Payment Bridge | GCUB',
                'meta_description' => 'Receive your government benefits and subsidies directly into your bank account with GCUB Aadhaar Payment Bridge System (APBS).',
                'meta_keywords' => 'apbs, aadhaar payment bridge, dbt, government subsidies'
            ],
            [
                'title' => 'NACH Service',
                'slug' => 'nach-service',
                'excerpt' => 'Simplified automated clearing for high-volume, repetitive electronic transactions.',
                'content' => '
                    <div class="mb-12">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">What is NACH?</h2>
                        <p class="text-lg text-slate-700 leading-relaxed mb-6">
                            National Automated Clearing House (NACH) is a centralized system launched by NPCI for banks, financial institutions, Corporates and Government to facilitate interbank, high volume, electronic transactions which are repetitive and periodic in nature.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div class="p-8 rounded-3xl border border-blue-200 bg-blue-50">
                            <h3>NACH Credit</h3>
                            <p>Used for making payments to multiple individuals (Salaries, Dividends, etc.).</p>
                        </div>
                        <div class="p-8 rounded-3xl border border-slate-200 bg-slate-50">
                            <h3>NACH Debit</h3>
                            <p>Used for collecting periodic payments (EMI, SIP, Utility Bills).</p>
                        </div>
                    </div>',
                'status' => 'active',
                'meta_title' => 'NACH Credit & Debit - Automated Payments | GCUB',
                'meta_description' => 'Automate your recurring payments and receive credits directly with National Automated Clearing House (NACH) service at GCUB.',
                'meta_keywords' => 'nach, automated clearing, emi, sip, salary disbursement'
            ],
            [
                'title' => 'IMPS',
                'slug' => 'imps',
                'excerpt' => 'Immediate Payment Service - Instant inter-bank electronic fund transfers, 24/7.',
                'content' => '
                    <h2 class="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                    <p class="text-gray-600 leading-relaxed mb-8">
                        <strong>Immediate Payment Service (IMPS)</strong> is an instant interbank electronic fund transfer service through mobile phones. Unlike NEFT and RTGS, the service is available 24/7 throughout the year including bank holidays.
                    </p>
                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Instant Transfer:</strong> Funds credited immediately.</li>
                        <li><strong>24/7 Availability:</strong> Works round the clock, 365 days a year.</li>
                        <li><strong>Multiple Channels:</strong> Accessible through Mobile Banking, Net Banking, and ATMs.</li>
                    </ul>',
                'status' => 'active',
                'meta_title' => 'IMPS - Instant Money Transfer | GCUB',
                'meta_description' => 'Transfer money instantly to any bank account with IMPS. Available 24/7, even on weekends and holidays.',
                'meta_keywords' => 'imps, instant transfer, 24/7 banking'
            ],
            [
                'title' => 'UPI',
                'slug' => 'upi',
                'excerpt' => 'Unified Payments Interface - The future of mobile payments.',
                'content' => '
                    <h2 class="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                    <p class="text-gray-600 leading-relaxed mb-8">
                        <strong>Unified Payments Interface (UPI)</strong> is a system that powers multiple bank accounts into a single mobile application, merging several banking features, seamless fund routing & merchant payments into one hood.
                    </p>
                    <h3>Benefits of UPI</h3>
                    <ul>
                        <li>Secure Transactions with 2FA</li>
                        <li>Real-Time Payment 24*7*365</li>
                        <li>Scan & Pay with QR Codes</li>
                        <li>Access multiple bank accounts in one app</li>
                    </ul>',
                'status' => 'active',
                'meta_title' => 'UPI - Unified Payments Interface | GCUB',
                'meta_description' => 'The simplest way to send and receive money. Unified Payments Interface (UPI) for fast, secure mobile payments.',
                'meta_keywords' => 'upi, bhim, scan and pay, mobile payments'
            ],
            [
                'title' => 'RuPay Cards',
                'slug' => 'rupay',
                'excerpt' => 'India\'s own card payment network. World-class privileges.',
                'content' => '
                    <h2 class="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                    <p class="text-gray-600 leading-relaxed mb-8">
                        <strong>RuPay</strong> is an Indian domestic card scheme conceived and launched by the NPCI. It facilitates electronic payment at all Indian banks and financial institutions.
                    </p>
                    <h3>Types of RuPay Cards</h3>
                    <ul>
                        <li><strong>RuPay Classic:</strong> Ideal for everyday shopping.</li>
                        <li><strong>RuPay Platinum:</strong> Premium card with exclusive lounge access and cashback.</li>
                    </ul>',
                'status' => 'active',
                'meta_title' => 'RuPay Cards - Domestic Payment Network | GCUB',
                'meta_description' => 'Enjoy world-class privileges with RuPay Classic and Platinum cards from GCUB.',
                'meta_keywords' => 'rupay, debit card, classic card, platinum card'
            ],
            [
                'title' => 'NEFT / RTGS',
                'slug' => 'neft-rtgs',
                'excerpt' => 'Safe and secure electronic fund transfers for high-value transactions.',
                'content' => '
                    <h2 class="text-3xl font-bold text-[#003399] mb-4">NEFT (National Electronic Funds Transfer)</h2>
                    <p>Nation-wide payment system facilitating batches of funds transfer settled in half-hourly batches.</p>
                    <h2 class="text-3xl font-bold text-[#003399] mb-4">RTGS (Real Time Gross Settlement)</h2>
                    <p>Continuous (real-time) settlement of funds transfers individually on an order by order basis. Minimum amount: ₹ 2,00,000.</p>',
                'status' => 'active',
                'meta_title' => 'NEFT and RTGS Fund Transfer | GCUB',
                'meta_description' => 'Transfer large sums of money securely with NEFT and RTGS services.',
                'meta_keywords' => 'neft, rtgs, fund transfer, bank remitance'
            ],
            [
                'title' => 'Net Banking',
                'slug' => 'net-banking',
                'excerpt' => 'Banking at your fingertips. Anywhere, Anytime.',
                'content' => '
                    <h2 class="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                    <p>Our <strong>Internet Banking</strong> service provides you with a convenient way to manage your finances from the comfort of your home or office. It is a secure, fast, and easy way to access your bank account 24/7.</p>
                    <h3>Key Features</h3>
                    <ul>
                        <li>Account Summary & Statement</li>
                        <li>Fund Transfer (Internal & External)</li>
                        <li>Bill Payments</li>
                        <li>Cheque Book Requests</li>
                    </ul>',
                'status' => 'active',
                'meta_title' => 'Internet Banking - Bank Securely Online | GCUB',
                'meta_description' => 'Access your account, transfer funds, and pay bills from anywhere with GCUB Internet Banking.',
                'meta_keywords' => 'net banking, internet banking, online banking'
            ],
        ];

        foreach ($services as $service) {
            $this->db->table('services')->insert($service);
        }
    }
}
