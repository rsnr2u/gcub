<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->options('(:any)', function () { }); // Handle OPTIONS request for CORS

$routes->group('api', ['namespace' => 'App\Controllers\Api'], function ($routes) {
    $routes->get('news', 'News::index');
    $routes->get('news/latest', 'News::latest');

    // Products & Services Routes
    $routes->get('products', 'Products::index');
    $routes->get('products/show/(:any)', 'Products::show/$1');
    $routes->post('products/create', 'Products::create');
    $routes->post('products/update/(:num)', 'Products::update/$1');
    $routes->post('products/delete/(:num)', 'Products::delete/$1');



    // Auth Routes
    $routes->post('login', 'AuthController::login');
    $routes->post('logout', 'AuthController::logout');

    // Admin Routes
    $routes->get('admin/stats', 'Admin::dashboardStats');
    $routes->get('admin/profile/(:num)', 'Admin::profile/$1');
    $routes->post('admin/profile/update/(:num)', 'Admin::updateProfile/$1');
    $routes->get('admin/settings', 'Admin::settings');
    $routes->post('admin/settings/update', 'Admin::updateSettings');
    $routes->post('media/upload', 'Media::upload');

    // Downloads Routes
    $routes->get('downloads', 'Downloads::index');
    $routes->get('downloads/show/(:num)', 'Downloads::show/$1');
    $routes->post('downloads/create', 'Downloads::create');
    $routes->post('downloads/update/(:num)', 'Downloads::update/$1');
    $routes->post('downloads/delete/(:num)', 'Downloads::delete/$1');

    // Interest Rates Routes
    $routes->get('interest-rates', 'InterestRates::index');
    $routes->get('interest-rates/show/(:num)', 'InterestRates::show/$1');
    $routes->post('interest-rates/create', 'InterestRates::create');
    $routes->post('interest-rates/update/(:num)', 'InterestRates::update/$1');
    $routes->post('interest-rates/delete/(:num)', 'InterestRates::delete/$1');

    // Branch Network Routes
    $routes->get('branches', 'Branches::index');
    $routes->get('branches/show/(:num)', 'Branches::show/$1');
    $routes->post('branches/create', 'Branches::create');
    $routes->post('branches/update/(:num)', 'Branches::update/$1');
    $routes->post('branches/delete/(:num)', 'Branches::delete/$1');

    // Bank About Routes
    $routes->get('bank-about', 'BankAbout::index');
    $routes->post('bank-about/metadata/update', 'BankAbout::updateMetadata');
    // Timeline
    $routes->post('bank-about/timeline/create', 'BankAbout::addTimeline');
    $routes->post('bank-about/timeline/update/(:num)', 'BankAbout::updateTimeline/$1');
    $routes->post('bank-about/timeline/delete/(:num)', 'BankAbout::deleteTimeline/$1');
    // Core Values
    $routes->post('bank-about/values/create', 'BankAbout::addValue');
    $routes->post('bank-about/values/update/(:num)', 'BankAbout::updateValue/$1');
    $routes->post('bank-about/values/delete/(:num)', 'BankAbout::deleteValue/$1');
    // Network
    $routes->post('bank-about/network/create', 'BankAbout::addNetwork');
    $routes->post('bank-about/network/update/(:num)', 'BankAbout::updateNetwork/$1');
    $routes->post('bank-about/network/delete/(:num)', 'BankAbout::deleteNetwork/$1');

    // Board of Directors Routes
    $routes->get('board-directors', 'BoardDirectors::index');
    $routes->get('board-directors/show/(:num)', 'BoardDirectors::show/$1');
    $routes->post('board-directors/create', 'BoardDirectors::create');
    $routes->post('board-directors/update/(:num)', 'BoardDirectors::update_item/$1');
    $routes->post('board-directors/delete/(:num)', 'BoardDirectors::delete/$1');

    // Board of Management Routes
    $routes->get('board-management', 'BoardManagement::index');
    $routes->get('board-management/show/(:num)', 'BoardManagement::show/$1');
    $routes->post('board-management/create', 'BoardManagement::create');
    $routes->post('board-management/update/(:num)', 'BoardManagement::update_item/$1');
    $routes->post('board-management/delete/(:num)', 'BoardManagement::delete/$1');

    // Annual Reports Routes
    $routes->get('annual-reports', 'AnnualReports::index');
    $routes->get('annual-reports/show/(:num)', 'AnnualReports::show/$1');
    $routes->post('annual-reports/create', 'AnnualReports::create');
    $routes->post('annual-reports/update/(:num)', 'AnnualReports::update_item/$1');
    $routes->post('annual-reports/delete/(:num)', 'AnnualReports::delete/$1');

    // Financial Indicators Routes
    $routes->get('financial-indicators', 'FinancialIndicators::index');
    $routes->get('financial-indicators/show/(:num)', 'FinancialIndicators::show/$1');
    $routes->post('financial-indicators/create', 'FinancialIndicators::create');
    $routes->post('financial-indicators/update/(:num)', 'FinancialIndicators::update_item/$1');
    $routes->post('financial-indicators/delete/(:num)', 'FinancialIndicators::delete/$1');

    // Highlights Routes
    $routes->get('highlights', 'Highlights::index');
    $routes->get('highlights/show/(:num)', 'Highlights::show/$1');
    $routes->post('highlights/create', 'Highlights::create');
    $routes->post('highlights/update/(:num)', 'Highlights::update_item/$1');
    $routes->post('highlights/delete/(:num)', 'Highlights::delete/$1');

    // Awards Routes
    $routes->get('awards', 'Awards::index');
    $routes->get('awards/show/(:num)', 'Awards::show/$1');
    $routes->post('awards/create', 'Awards::create');
    $routes->post('awards/update/(:num)', 'Awards::update_item/$1');
    $routes->post('awards/delete/(:num)', 'Awards::delete/$1');

    // DEAF Accounts Routes
    $routes->get('deaf-accounts', 'DeafAccounts::index');
    $routes->get('deaf-accounts/show/(:num)', 'DeafAccounts::show/$1');
    $routes->post('deaf-accounts/create', 'DeafAccounts::create');
    $routes->post('deaf-accounts/update/(:num)', 'DeafAccounts::update/$1');
    $routes->post('deaf-accounts/delete/(:num)', 'DeafAccounts::delete/$1');

    // DICGC Certificate Routes
    $routes->get('dicgc', 'Dicgc::index');
    $routes->post('dicgc/update', 'Dicgc::update');

    // Ombudsman Routes
    $routes->get('ombudsman', 'Ombudsman::index');
    $routes->get('ombudsman/show/(:num)', 'Ombudsman::show/$1');
    $routes->post('ombudsman/create', 'Ombudsman::create');
    $routes->post('ombudsman/update/(:num)', 'Ombudsman::update/$1');
    $routes->post('ombudsman/delete/(:num)', 'Ombudsman::delete/$1');

    // Sliders Routes
    $routes->get('sliders', 'Sliders::index');
    $routes->get('sliders/show/(:num)', 'Sliders::show/$1');
    $routes->post('sliders/create', 'Sliders::create');
    $routes->post('sliders/update/(:num)', 'Sliders::update/$1');
    $routes->post('sliders/delete/(:num)', 'Sliders::delete/$1');

    // Home Page Content Routes
    $routes->get('homepage-content', 'HomePageContent::index');
    $routes->post('homepage-content/update', 'HomePageContent::update');

    // Home Page Stats Routes
    $routes->get('homepage-stats', 'HomePageStats::index');
    $routes->post('homepage-stats/create', 'HomePageStats::create');
    $routes->post('homepage-stats/update/(:num)', 'HomePageStats::update/$1');
    $routes->post('homepage-stats/delete/(:num)', 'HomePageStats::delete/$1');

    // Missed Call Banking Routes
    $routes->get('missed-call-banking-content', 'MissedCallBankingContent::index');
    $routes->post('missed-call-banking-content/update', 'MissedCallBankingContent::update');
    $routes->get('missed-call-banking-services', 'MissedCallBankingServices::index');
    $routes->post('missed-call-banking-services/create', 'MissedCallBankingServices::create');
    $routes->post('missed-call-banking-services/update/(:num)', 'MissedCallBankingServices::update/$1');
    $routes->post('missed-call-banking-services/delete/(:num)', 'MissedCallBankingServices::delete/$1');

    // KYC Norms Routes
    $routes->get('kyc-norms-content', 'KycNormsContent::index');
    $routes->post('kyc-norms-content/update', 'KycNormsContent::update');
    $routes->get('kyc-documents', 'KycDocuments::index');
    $routes->get('kyc-documents/category/(:alpha)', 'KycDocuments::getByCategory/$1');
    $routes->post('kyc-documents/create', 'KycDocuments::create');
    $routes->post('kyc-documents/update/(:num)', 'KycDocuments::update/$1');
    $routes->post('kyc-documents/delete/(:num)', 'KycDocuments::delete/$1');

    // Holidays Routes
    $routes->get('holidays-content', 'HolidaysContent::index');
    $routes->post('holidays-content/update', 'HolidaysContent::update');
    $routes->get('holidays', 'Holidays::index');
    $routes->post('holidays/create', 'Holidays::create');
    $routes->post('holidays/update/(:num)', 'Holidays::update/$1');
    $routes->post('holidays/delete/(:num)', 'Holidays::delete/$1');

    // User Management Routes
    $routes->get('users', 'Users::index');
    $routes->get('users/show/(:num)', 'Users::show/$1');
    $routes->post('users/create', 'Users::create');
    $routes->post('users/update/(:num)', 'Users::update/$1');
    $routes->post('users/delete/(:num)', 'Users::delete/$1');
    $routes->post('users/toggle-status/(:num)', 'Users::toggleStatus/$1');

    $routes->get('roles', 'Roles::index');
    $routes->get('roles/show/(:num)', 'Roles::show/$1');
    $routes->post('roles/create', 'Roles::create');
    $routes->post('roles/update/(:num)', 'Roles::update/$1');
    $routes->post('roles/delete/(:num)', 'Roles::delete/$1');
    $routes->post('roles/assign-permissions/(:num)', 'Roles::assignPermissions/$1');

    $routes->get('permissions', 'Permissions::index');
    $routes->get('permissions/grouped', 'Permissions::grouped');
    $routes->get('permissions/by-role/(:num)', 'Permissions::getByRole/$1');

    // Quick Access Routes
    $routes->get('quick-access', 'QuickAccess::index');
    $routes->get('quick-access/show/(:num)', 'QuickAccess::show/$1');
    $routes->post('quick-access/create', 'QuickAccess::create');
    $routes->post('quick-access/update/(:num)', 'QuickAccess::update/$1');
    $routes->post('quick-access/delete/(:num)', 'QuickAccess::delete/$1');
    $routes->post('quick-access/toggle-status/(:num)', 'QuickAccess::toggleStatus/$1');
    $routes->post('quick-access/reorder', 'QuickAccess::reorder');

    // Contact Submissions Routes
    $routes->get('contact-submissions', 'ContactSubmissions::index');
    $routes->get('contact-submissions/show/(:num)', 'ContactSubmissions::show/$1');
    $routes->post('contact-submissions/create', 'ContactSubmissions::create');
    $routes->post('contact-submissions/update-status/(:num)', 'ContactSubmissions::updateStatus/$1');
    $routes->post('contact-submissions/update-notes/(:num)', 'ContactSubmissions::updateNotes/$1');
    $routes->post('contact-submissions/delete/(:num)', 'ContactSubmissions::delete/$1');


    // Chairman's Desk Routes
    $routes->get('chairman', 'Chairman::index');
    $routes->get('chairman/show/(:num)', 'Chairman::show/$1');
    $routes->post('chairman/create', 'Chairman::create');
    $routes->post('chairman/update/(:num)', 'Chairman::update/$1');
    $routes->post('chairman/delete/(:num)', 'Chairman::delete/$1');

    // Sitemap Route (Dynamic)
    $routes->get('sitemap.xml', 'Sitemap::index');
});


