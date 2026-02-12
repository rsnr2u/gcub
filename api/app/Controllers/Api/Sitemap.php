<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Sitemap extends ResourceController
{
    protected $format = 'xml';

    public function index()
    {
        // Get domain from settings
        $settingsModel = new \App\Models\SettingsModel();
        $settings = $settingsModel->getAllSettings();
        $domain = $settings['domain_name'] ?? 'https://guntururban.bank.in';

        // Remove trailing slash if present
        $domain = rtrim($domain, '/');

        // Get current date
        $currentDate = date('Y-m-d');

        // Build sitemap XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Define all URLs with their properties
        $urls = [
            // Homepage
            ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],

            // About Section
            ['loc' => '/about', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/management', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/financial-reports', 'priority' => '0.8', 'changefreq' => 'monthly'],

            // Deposit Products
            ['loc' => '/savings-account', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/current-account', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/fixed-deposits', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/recurring-deposits', 'priority' => '0.9', 'changefreq' => 'monthly'],

            // Loan Products
            ['loc' => '/gold-loans', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/personal-loans', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/business-loans', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/vehicle-loans', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['loc' => '/home-loans', 'priority' => '0.9', 'changefreq' => 'monthly'],

            // Services
            ['loc' => '/mobile-banking', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/internet-banking', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/atm-services', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/locker-facility', 'priority' => '0.8', 'changefreq' => 'monthly'],

            // Information Pages
            ['loc' => '/interest-rates', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['loc' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/downloads', 'priority' => '0.7', 'changefreq' => 'weekly'],
            ['loc' => '/branch-locator', 'priority' => '0.8', 'changefreq' => 'monthly'],

            // Disclosures
            ['loc' => '/dicgc-certificate', 'priority' => '0.7', 'changefreq' => 'yearly'],
            ['loc' => '/ombudsman', 'priority' => '0.7', 'changefreq' => 'yearly'],
            ['loc' => '/iso-certified', 'priority' => '0.7', 'changefreq' => 'yearly'],
            ['loc' => '/deaf-accounts', 'priority' => '0.7', 'changefreq' => 'yearly'],

            // Legal & Policies
            ['loc' => '/privacy-policy', 'priority' => '0.6', 'changefreq' => 'yearly'],
            ['loc' => '/terms-of-service', 'priority' => '0.6', 'changefreq' => 'yearly'],
            ['loc' => '/sitemap', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ];

        // Add each URL to sitemap
        foreach ($urls as $url) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$domain}{$url['loc']}</loc>\n";
            $xml .= "    <lastmod>{$currentDate}</lastmod>\n";
            $xml .= "    <changefreq>{$url['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$url['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        // Set proper headers
        return $this->response
            ->setContentType('application/xml')
            ->setBody($xml);
    }
}
