<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ContactSubmissionsSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'request_type' => 'General Enquiry',
                'full_name' => 'Rajesh Kumar',
                'email' => 'rajesh.kumar@gmail.com',
                'phone' => '+91 98765 43210',
                'subject' => 'Account Opening Process',
                'message' => 'I would like to know the documents required for opening a savings account. Can you please provide the complete list?',
                'status' => 'new',
                'admin_notes' => null,
                'submitted_at' => '2026-02-06 10:30:00',
                'updated_at' => null
            ],
            [
                'request_type' => 'Fraud Complaint',
                'full_name' => 'Priya Sharma',
                'email' => 'priya.sharma@yahoo.com',
                'phone' => '+91 87654 32109',
                'subject' => 'Suspicious Transaction Alert',
                'message' => 'I noticed some unauthorized transactions in my account. Please help me block my card immediately and investigate this matter.',
                'status' => 'in_progress',
                'admin_notes' => 'Card blocked. Investigation team contacted.',
                'submitted_at' => '2026-02-06 09:15:00',
                'updated_at' => '2026-02-06 10:00:00'
            ],
            [
                'request_type' => 'Lodge a Complaint',
                'full_name' => 'Amit Patel',
                'email' => 'amit.patel@hotmail.com',
                'phone' => null,
                'subject' => 'Poor Customer Service at Branch',
                'message' => 'I visited the Brodipet branch yesterday and the staff was very rude. I had to wait for 2 hours just to update my passbook. This is unacceptable.',
                'status' => 'in_progress',
                'admin_notes' => 'Escalated to branch manager for review.',
                'submitted_at' => '2026-02-06 08:45:00',
                'updated_at' => '2026-02-06 09:30:00'
            ],
            [
                'request_type' => 'Feed Back',
                'full_name' => 'Lakshmi Reddy',
                'email' => 'lakshmi.reddy@gmail.com',
                'phone' => '+91 76543 21098',
                'subject' => 'Excellent Mobile Banking App',
                'message' => 'I just wanted to appreciate the new mobile banking app. It is very user-friendly and all features work smoothly. Great job!',
                'status' => 'resolved',
                'admin_notes' => 'Forwarded to IT team. Customer thanked.',
                'submitted_at' => '2026-02-05 16:20:00',
                'updated_at' => '2026-02-06 08:00:00'
            ],
            [
                'request_type' => 'General Enquiry',
                'full_name' => 'Suresh Babu',
                'email' => 'suresh.babu@outlook.com',
                'phone' => '+91 65432 10987',
                'subject' => 'Gold Loan Interest Rates',
                'message' => 'What are the current interest rates for gold loans? Also, what is the maximum loan amount I can get?',
                'status' => 'new',
                'admin_notes' => null,
                'submitted_at' => '2026-02-06 11:00:00',
                'updated_at' => null
            ],
            [
                'request_type' => 'General Enquiry',
                'full_name' => 'Kavita Singh',
                'email' => 'kavita.singh@gmail.com',
                'phone' => '+91 54321 09876',
                'subject' => 'Fixed Deposit Maturity',
                'message' => 'My FD is maturing next month. Can I renew it online or do I need to visit the branch?',
                'status' => 'resolved',
                'admin_notes' => 'Informed customer about online renewal process.',
                'submitted_at' => '2026-02-05 14:30:00',
                'updated_at' => '2026-02-05 15:45:00'
            ],
            [
                'request_type' => 'Lodge a Complaint',
                'full_name' => 'Venkat Rao',
                'email' => 'venkat.rao@gmail.com',
                'phone' => '+91 43210 98765',
                'subject' => 'ATM Not Dispensing Cash',
                'message' => 'The ATM at Market Road is not dispensing cash but my account was debited. Transaction ID: TXN123456789. Please refund immediately.',
                'status' => 'in_progress',
                'admin_notes' => 'Transaction under review. Refund will be processed within 24 hours.',
                'submitted_at' => '2026-02-06 07:30:00',
                'updated_at' => '2026-02-06 08:15:00'
            ],
            [
                'request_type' => 'General Enquiry',
                'full_name' => 'Deepa Menon',
                'email' => 'deepa.menon@yahoo.com',
                'phone' => null,
                'subject' => 'Education Loan Eligibility',
                'message' => 'My daughter got admission in engineering college. What are the eligibility criteria for education loan and what is the maximum amount?',
                'status' => 'new',
                'admin_notes' => null,
                'submitted_at' => '2026-02-06 12:15:00',
                'updated_at' => null
            ],
            [
                'request_type' => 'Feed Back',
                'full_name' => 'Ramesh Gupta',
                'email' => 'ramesh.gupta@gmail.com',
                'phone' => '+91 32109 87654',
                'subject' => 'Quick Loan Approval',
                'message' => 'I applied for a personal loan and it was approved within 2 days. Very impressed with the quick service. Thank you!',
                'status' => 'resolved',
                'admin_notes' => 'Positive feedback shared with loan department.',
                'submitted_at' => '2026-02-05 11:00:00',
                'updated_at' => '2026-02-05 12:30:00'
            ],
            [
                'request_type' => 'Fraud Complaint',
                'full_name' => 'Anita Desai',
                'email' => 'anita.desai@gmail.com',
                'phone' => '+91 21098 76543',
                'subject' => 'Phishing Email Received',
                'message' => 'I received an email claiming to be from GCUB asking for my account details and password. This looks like a phishing attempt. Please investigate.',
                'status' => 'resolved',
                'admin_notes' => 'Security team notified. Customer educated about phishing. Email reported.',
                'submitted_at' => '2026-02-05 09:00:00',
                'updated_at' => '2026-02-05 10:30:00'
            ]
        ];

        foreach ($data as $item) {
            $this->db->table('contact_submissions')->insert($item);
        }
    }
}
