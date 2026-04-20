<?php

namespace App\Libraries;

use CodeIgniter\Email\Email;
use Config\Services;

class SecurityNotifier
{
    /**
     * Dispatches an SMTP email alerting about a security incident.
     * 
     * @param string $incidentType A short phrase describing what happened.
     * @param array $details Contextual info like IP Address, endpoint, missing token, etc.
     */
    public static function notify(string $incidentType, array $details = [])
    {
        try {
            /** @var Email $email */
            $email = Services::email();

            // Set the recipient to the requested security channel
            $email->setTo('info@digitalks.in');

            $email->setSubject("🚨 GCUB Security Alert: {$incidentType}");

            // Format an HTML payload
            $htmlMessage = "<h2>Security Incident Detected</h2>";
            $htmlMessage .= "<p><strong>Incident Type:</strong> " . esc($incidentType) . "</p>";
            $htmlMessage .= "<p><strong>Timestamp:</strong> " . date('Y-m-d H:i:s') . " (Server Time)</p>";

            if (!empty($details)) {
                $htmlMessage .= "<h3>Incident Details</h3>";
                $htmlMessage .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>";
                foreach ($details as $key => $value) {
                    $htmlMessage .= "<tr><th>" . esc($key) . "</th><td>" . esc($value) . "</td></tr>";
                }
                $htmlMessage .= "</table>";
            }

            $email->setMessage($htmlMessage);
            $email->setMailType('html');

            // Send async without failing execution flow if SMTP is broken or .env is unconfigured
            $email->send();

        } catch (\Exception $e) {
            // Silently fail to not prevent system operability if mailer is down
            log_message('error', 'SecurityNotifier failed to dispatch: ' . $e->getMessage());
        }
    }
}
