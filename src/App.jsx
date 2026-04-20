import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';

// Public Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const BoardDirectors = lazy(() => import('./pages/BoardDirectors'));
const Management = lazy(() => import('./pages/Management'));
const BranchLocator = lazy(() => import('./pages/BranchLocator'));
const InterestRates = lazy(() => import('./pages/InterestRates'));
const Downloads = lazy(() => import('./pages/Downloads'));
const FinancialReports = lazy(() => import('./pages/FinancialReports'));
const ChairmanDesk = lazy(() => import('./pages/ChairmanDesk'));
const Highlights = lazy(() => import('./pages/Highlights'));
const Awards = lazy(() => import('./pages/Awards'));
const Contact = lazy(() => import('./pages/Contact'));
const SavingsAccount = lazy(() => import('./pages/SavingsAccount'));
const CurrentAccount = lazy(() => import('./pages/CurrentAccount'));
const FixedDeposits = lazy(() => import('./pages/FixedDeposits'));
const GoldLoans = lazy(() => import('./pages/GoldLoans'));
const EMICalculator = lazy(() => import('./pages/EMICalculator'));
const MissedCallBanking = lazy(() => import('./pages/MissedCallBanking'));
const HolidayList = lazy(() => import('./pages/HolidayList'));
const KYCNorms = lazy(() => import('./pages/KYCNorms'));
const IMPS = lazy(() => import('./pages/IMPS'));
const UPI = lazy(() => import('./pages/UPI'));
const RuPay = lazy(() => import('./pages/RuPay'));
const NEFTRTGS = lazy(() => import('./pages/NEFTRTGS'));
const NetBanking = lazy(() => import('./pages/NetBanking'));
const HousingLoans = lazy(() => import('./pages/HousingLoans'));
const EducationLoans = lazy(() => import('./pages/EducationLoans'));
const SafeLockers = lazy(() => import('./pages/SafeLockers'));
const RecurringDeposits = lazy(() => import('./pages/RecurringDeposits'));
const Overdraft = lazy(() => import('./pages/Overdraft'));
const TermLoans = lazy(() => import('./pages/TermLoans'));
const ProjectFinance = lazy(() => import('./pages/ProjectFinance'));
const AnyBranchBanking = lazy(() => import('./pages/AnyBranchBanking'));
const CustomerServiceCharges = lazy(() => import('./pages/CustomerServiceCharges'));
const CyberSecurity = lazy(() => import('./pages/CyberSecurity'));
const DeafAccounts = lazy(() => import('./pages/DeafAccounts'));
const DebitCards = lazy(() => import('./pages/DebitCards'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const DICGCCertificate = lazy(() => import('./pages/DICGCCertificate'));
const Ombudsman = lazy(() => import('./pages/Ombudsman'));
const ISOCertified = lazy(() => import('./pages/ISOCertified'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const GalleryDetail = lazy(() => import('./pages/GalleryDetail'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

// Admin Pages
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminGalleryForm = lazy(() => import('./pages/admin/AdminGalleryForm'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Profile = lazy(() => import('./pages/admin/Profile'));
const GlobalSettings = lazy(() => import('./pages/admin/settings/GlobalSettings'));
const SEOSettings = lazy(() => import('./pages/admin/settings/SEOSettings'));
const SocialSettings = lazy(() => import('./pages/admin/settings/SocialSettings'));
const BrandingSettings = lazy(() => import('./pages/admin/settings/BrandingSettings'));
const PopupSettings = lazy(() => import('./pages/admin/settings/PopupSettings'));
const StatisticsSettings = lazy(() => import('./pages/admin/settings/StatisticsSettings'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminEditProduct = lazy(() => import('./pages/admin/AdminEditProduct'));
const AdminDownloads = lazy(() => import('./pages/admin/AdminDownloads'));
const AdminEditDownload = lazy(() => import('./pages/admin/AdminEditDownload'));
const AdminInterestRates = lazy(() => import('./pages/admin/AdminInterestRates'));
const AdminBranches = lazy(() => import('./pages/admin/AdminBranches'));
const AdminEditBranch = lazy(() => import('./pages/admin/AdminEditBranch'));
const AdminBankInfo = lazy(() => import('./pages/admin/AdminBankInfo'));
const AdminChairman = lazy(() => import('./pages/admin/AdminChairman'));
const AdminBoardDirectors = lazy(() => import('./pages/admin/AdminBoardDirectors'));
const AdminEditBoardDirector = lazy(() => import('./pages/admin/AdminEditBoardDirector'));
const AdminBoardManagement = lazy(() => import('./pages/admin/AdminBoardManagement'));
const AdminEditBoardManagement = lazy(() => import('./pages/admin/AdminEditBoardManagement'));
const AdminAnnualReports = lazy(() => import('./pages/admin/AdminAnnualReports'));
const AdminEditAnnualReport = lazy(() => import('./pages/admin/AdminEditAnnualReport'));
const AdminEditFinancialIndicator = lazy(() => import('./pages/admin/AdminEditFinancialIndicator'));
const AdminHighlights = lazy(() => import('./pages/admin/AdminHighlights'));
const AdminEditHighlight = lazy(() => import('./pages/admin/AdminEditHighlight'));
const AdminAwards = lazy(() => import('./pages/admin/AdminAwards'));
const AdminEditAward = lazy(() => import('./pages/admin/AdminEditAward'));
const AdminDeafAccounts = lazy(() => import('./pages/admin/AdminDeafAccounts'));
const AdminEditDeafAccount = lazy(() => import('./pages/admin/AdminEditDeafAccount'));
const AdminSliders = lazy(() => import('./pages/admin/AdminSliders'));
const AdminEditSlider = lazy(() => import('./pages/admin/AdminEditSlider'));
const AdminHomePageContent = lazy(() => import('./pages/admin/AdminHomePageContent'));
const AdminMissedCallBanking = lazy(() => import('./pages/admin/AdminMissedCallBanking'));
const AdminKycNorms = lazy(() => import('./pages/admin/AdminKycNorms'));
const AdminHolidays = lazy(() => import('./pages/admin/AdminHolidays'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminEditUser = lazy(() => import('./pages/admin/AdminEditUser'));
const AdminRoles = lazy(() => import('./pages/admin/AdminRoles'));
const AdminQuickAccess = lazy(() => import('./pages/admin/AdminQuickAccess'));
const AdminEditQuickAccess = lazy(() => import('./pages/admin/AdminEditQuickAccess'));
const AdminContactSubmissions = lazy(() => import('./pages/admin/AdminContactSubmissions'));
const AdminViewContactSubmission = lazy(() => import('./pages/admin/AdminViewContactSubmission'));
const AdminNews = lazy(() => import('./pages/admin/AdminNews'));
const AdminEditNews = lazy(() => import('./pages/admin/AdminEditNews'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminEditService = lazy(() => import('./pages/admin/AdminEditService'));
const AdminEditStructuredService = lazy(() => import('./pages/admin/AdminEditStructuredService'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

// Banking Services
const MobileBanking = lazy(() => import('./pages/services/MobileBanking'));
const ATMService = lazy(() => import('./pages/services/ATMService'));
const TollFreeBanking = lazy(() => import('./pages/services/TollFreeBanking'));
const EStatements = lazy(() => import('./pages/services/EStatements'));
const PositivePaySystem = lazy(() => import('./pages/services/PositivePaySystem'));
const AnyBranchBankingStatic = lazy(() => import('./pages/services/AnyBranchBanking'));
const APBSService = lazy(() => import('./pages/services/APBSService'));
const NACHService = lazy(() => import('./pages/services/NACHService'));


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003399]"></div>
        </div>
      }>
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/board-directors" element={<BoardDirectors />} />
            <Route path="/management" element={<Management />} />
            <Route path="/branch-locator" element={<BranchLocator />} />
            <Route path="/interest-rates" element={<InterestRates />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/financial-reports" element={<FinancialReports />} />
            <Route path="/chairman-desk" element={<ChairmanDesk />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/awards-recognitions" element={<Awards />} />
            <Route path="/contact" element={<Contact />} />

            {/* Deposits */}
            <Route path="/savings-account" element={<SavingsAccount />} />
            <Route path="/current-account" element={<CurrentAccount />} />
            <Route path="/fixed-deposits" element={<FixedDeposits />} />

            {/* Loans */}
            <Route path="/gold-loans" element={<GoldLoans />} />

            {/* Quick Links / Others */}
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/missed-call-banking" element={<MissedCallBanking />} />
            <Route path="/holiday-list" element={<HolidayList />} />
            <Route path="/kyc-norms" element={<KYCNorms />} />

            {/* Services & Products */}
            <Route path="/imps" element={<IMPS />} />
            <Route path="/upi" element={<UPI />} />
            <Route path="/rupay" element={<RuPay />} />
            <Route path="/neft-rtgs" element={<NEFTRTGS />} />
            <Route path="/net-banking" element={<NetBanking />} />
            <Route path="/housing-loans" element={<HousingLoans />} />
            <Route path="/education-loans" element={<EducationLoans />} />
            <Route path="/safe-lockers" element={<SafeLockers />} />
            <Route path="/recurring-deposits" element={<RecurringDeposits />} />
            <Route path="/overdraft" element={<Overdraft />} />
            <Route path="/term-loans" element={<TermLoans />} />
            <Route path="/project-finance" element={<ProjectFinance />} />
            <Route path="/any-branch-banking" element={<AnyBranchBankingStatic />} />
            <Route path="/mobile-banking" element={<MobileBanking />} />
            <Route path="/atm-services" element={<ATMService />} />
            <Route path="/toll-free-banking" element={<TollFreeBanking />} />
            <Route path="/e-statements" element={<EStatements />} />
            <Route path="/positive-pay-system" element={<PositivePaySystem />} />
            <Route path="/apbs-service" element={<APBSService />} />
            <Route path="/nach-service" element={<NACHService />} />
            <Route path="/customer-service-charges" element={<CustomerServiceCharges />} />
            <Route path="/cyber-security" element={<CyberSecurity />} />
            <Route path="/deaf-accounts" element={<DeafAccounts />} />
            <Route path="/debit-cards" element={<DebitCards />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />


            {/* Disclosures */}
            <Route path="/dicgc-certificate" element={<DICGCCertificate />} />
            <Route path="/ombudsman" element={<Ombudsman />} />
            <Route path="/iso-certified" element={<ISOCertified />} />

            {/* Legal & Policies */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/sitemap" element={<SitemapPage />} />

          </Route>

          {/* Admin Login - No Header/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard - With Admin Sidebar/Topbar */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings">
              <Route index element={<GlobalSettings />} />
              <Route path="global" element={<GlobalSettings />} />
              <Route path="seo" element={<SEOSettings />} />
              <Route path="social" element={<SocialSettings />} />
              <Route path="branding" element={<BrandingSettings />} />
              <Route path="popup" element={<PopupSettings />} />
            </Route>
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminEditProduct />} />
            <Route path="products/edit/:id" element={<AdminEditProduct />} />

            <Route path="downloads" element={<AdminDownloads />} />
            <Route path="downloads/new" element={<AdminEditDownload />} />
            <Route path="downloads/edit/:id" element={<AdminEditDownload />} />
            <Route path="interest-rates" element={<AdminInterestRates />} />
            <Route path="branches" element={<AdminBranches />} />
            <Route path="branches/new" element={<AdminEditBranch />} />
            <Route path="branches/edit/:id" element={<AdminEditBranch />} />
            <Route path="bank-info" element={<AdminBankInfo />} />
            <Route path="chairman" element={<AdminChairman />} />
            <Route path="board-directors" element={<AdminBoardDirectors />} />
            <Route path="board-directors/new" element={<AdminEditBoardDirector />} />
            <Route path="board-directors/edit/:id" element={<AdminEditBoardDirector />} />
            <Route path="board-management" element={<AdminBoardManagement />} />
            <Route path="board-management/new" element={<AdminEditBoardManagement />} />
            <Route path="board-management/edit/:id" element={<AdminEditBoardManagement />} />
            <Route path="annual-reports" element={<AdminAnnualReports />} />
            <Route path="annual-reports/new" element={<AdminEditAnnualReport />} />
            <Route path="annual-reports/edit/:id" element={<AdminEditAnnualReport />} />
            <Route path="financial-indicators/new" element={<AdminEditFinancialIndicator />} />
            <Route path="financial-indicators/edit/:id" element={<AdminEditFinancialIndicator />} />
            <Route path="highlights" element={<AdminHighlights />} />
            <Route path="highlights/new" element={<AdminEditHighlight />} />
            <Route path="highlights/edit/:id" element={<AdminEditHighlight />} />
            <Route path="awards" element={<AdminAwards />} />
            <Route path="awards/new" element={<AdminEditAward />} />
            <Route path="awards/edit/:id" element={<AdminEditAward />} />
            <Route path="disclosures/deaf-accounts" element={<AdminDeafAccounts />} />
            <Route path="disclosures/deaf-accounts/new" element={<AdminEditDeafAccount />} />
            <Route path="disclosures/deaf-accounts/edit/:id" element={<AdminEditDeafAccount />} />
            <Route path="content/sliders" element={<AdminSliders />} />
            <Route path="content/sliders/new" element={<AdminEditSlider />} />
            <Route path="content/sliders/edit/:id" element={<AdminEditSlider />} />
            <Route path="content/news" element={<AdminNews />} />
            <Route path="content/news/new" element={<AdminEditNews />} />
            <Route path="content/news/create" element={<AdminEditNews />} />
            <Route path="content/news/edit/:id" element={<AdminEditNews />} />
            <Route path="content/services" element={<AdminServices />} />
            <Route path="content/services/new" element={<AdminEditService />} />
            <Route path="content/services/create" element={<AdminEditService />} />
            <Route path="content/services/edit/:id" element={<AdminEditService />} />
            <Route path="services/:slug" element={<AdminEditStructuredService />} />
            <Route path="content/home-page" element={<AdminHomePageContent />} />
            <Route path="content/statistics" element={<StatisticsSettings />} />
            <Route path="content/missed-call-banking" element={<AdminMissedCallBanking />} />
            <Route path="content/kyc-norms" element={<AdminKycNorms />} />
            <Route path="content/holidays" element={<AdminHolidays />} />
            <Route path="content/quick-access" element={<AdminQuickAccess />} />
            <Route path="content/quick-access/new" element={<AdminEditQuickAccess />} />
            <Route path="content/quick-access/edit/:id" element={<AdminEditQuickAccess />} />
            <Route path="content/gallery" element={<AdminGallery />} />
            <Route path="content/gallery/new" element={<AdminGalleryForm />} />
            <Route path="content/gallery/create" element={<AdminGalleryForm />} />
            <Route path="content/gallery/edit/:id" element={<AdminGalleryForm />} />
            <Route path="contact-submissions" element={<AdminContactSubmissions />} />
            <Route path="contact-submissions/view/:id" element={<AdminViewContactSubmission />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/new" element={<AdminEditUser />} />
            <Route path="users/edit/:id" element={<AdminEditUser />} />
            <Route path="roles" element={<AdminRoles />} />
          </Route>

          {/* Catch-all - Should be last */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
