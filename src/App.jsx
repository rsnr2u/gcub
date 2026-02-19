import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import BoardDirectors from './pages/BoardDirectors';
import Management from './pages/Management';
import BranchLocator from './pages/BranchLocator';
import InterestRates from './pages/InterestRates';
import Downloads from './pages/Downloads';
import FinancialReports from './pages/FinancialReports';
import ChairmanDesk from './pages/ChairmanDesk';
import Highlights from './pages/Highlights';
import Awards from './pages/Awards';
import Contact from './pages/Contact';
import SavingsAccount from './pages/SavingsAccount';
import CurrentAccount from './pages/CurrentAccount';
import FixedDeposits from './pages/FixedDeposits';
import GoldLoans from './pages/GoldLoans';
import EMICalculator from './pages/EMICalculator';
import MissedCallBanking from './pages/MissedCallBanking';
import HolidayList from './pages/HolidayList';
import KYCNorms from './pages/KYCNorms';
import IMPS from './pages/IMPS';
import UPI from './pages/UPI';
import RuPay from './pages/RuPay';
import NEFTRTGS from './pages/NEFTRTGS';
import NetBanking from './pages/NetBanking';
import HousingLoans from './pages/HousingLoans';
import EducationLoans from './pages/EducationLoans';
import SafeLockers from './pages/SafeLockers';
import RecurringDeposits from './pages/RecurringDeposits';
import Overdraft from './pages/Overdraft';
import TermLoans from './pages/TermLoans';
import ProjectFinance from './pages/ProjectFinance';
import AnyBranchBanking from './pages/AnyBranchBanking';
import CustomerServiceCharges from './pages/CustomerServiceCharges';
import CyberSecurity from './pages/CyberSecurity';
import DeafAccounts from './pages/DeafAccounts';
import DebitCards from './pages/DebitCards';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import SitemapPage from './pages/SitemapPage';
import DICGCCertificate from './pages/DICGCCertificate';
import Ombudsman from './pages/Ombudsman';
import ISOCertified from './pages/ISOCertified';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Profile from './pages/admin/Profile';
import GlobalSettings from './pages/admin/settings/GlobalSettings';
import SEOSettings from './pages/admin/settings/SEOSettings';
import SocialSettings from './pages/admin/settings/SocialSettings';
import BrandingSettings from './pages/admin/settings/BrandingSettings';
import PopupSettings from './pages/admin/settings/PopupSettings';
import StatisticsSettings from './pages/admin/settings/StatisticsSettings';
import AdminProducts from './pages/admin/AdminProducts';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminDownloads from './pages/admin/AdminDownloads';
import AdminEditDownload from './pages/admin/AdminEditDownload';
import AdminInterestRates from './pages/admin/AdminInterestRates';
import AdminBranches from './pages/admin/AdminBranches';
import AdminEditBranch from './pages/admin/AdminEditBranch';
import AdminBankInfo from './pages/admin/AdminBankInfo';
import AdminChairman from './pages/admin/AdminChairman';
import AdminBoardDirectors from './pages/admin/AdminBoardDirectors';
import AdminEditBoardDirector from './pages/admin/AdminEditBoardDirector';
import AdminBoardManagement from './pages/admin/AdminBoardManagement';
import AdminEditBoardManagement from './pages/admin/AdminEditBoardManagement';
import AdminAnnualReports from './pages/admin/AdminAnnualReports';
import AdminEditAnnualReport from './pages/admin/AdminEditAnnualReport';
import AdminEditFinancialIndicator from './pages/admin/AdminEditFinancialIndicator';
import AdminHighlights from './pages/admin/AdminHighlights';
import AdminEditHighlight from './pages/admin/AdminEditHighlight';
import AdminAwards from './pages/admin/AdminAwards';
import AdminEditAward from './pages/admin/AdminEditAward';
import AdminDeafAccounts from './pages/admin/AdminDeafAccounts';
import AdminEditDeafAccount from './pages/admin/AdminEditDeafAccount';
import AdminOmbudsman from './pages/admin/AdminOmbudsman';
import AdminEditOmbudsman from './pages/admin/AdminEditOmbudsman';
import AdminSliders from './pages/admin/AdminSliders';
import AdminEditSlider from './pages/admin/AdminEditSlider';
import AdminHomePageContent from './pages/admin/AdminHomePageContent';
import AdminMissedCallBanking from './pages/admin/AdminMissedCallBanking';
import AdminKycNorms from './pages/admin/AdminKycNorms';
import AdminHolidays from './pages/admin/AdminHolidays';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEditUser from './pages/admin/AdminEditUser';
import AdminRoles from './pages/admin/AdminRoles';
import AdminQuickAccess from './pages/admin/AdminQuickAccess';
import AdminEditQuickAccess from './pages/admin/AdminEditQuickAccess';
import AdminContactSubmissions from './pages/admin/AdminContactSubmissions';
import AdminViewContactSubmission from './pages/admin/AdminViewContactSubmission';
import ProductDetail from './pages/ProductDetail';

// Individual Static Banking Services
import MobileBanking from './pages/services/MobileBanking';
import ATMService from './pages/services/ATMService';
import TollFreeBanking from './pages/services/TollFreeBanking';
import EStatements from './pages/services/EStatements';
import PositivePaySystem from './pages/services/PositivePaySystem';
import AnyBranchBankingStatic from './pages/services/AnyBranchBanking';
import APBSService from './pages/services/APBSService';
import NACHService from './pages/services/NACHService';


function App() {
  return (
    <Router>
      <ScrollToTop />
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
          <Route path="/product/:slug" element={<ProductDetail />} />


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
          <Route path="disclosures/ombudsman" element={<AdminOmbudsman />} />
          <Route path="disclosures/ombudsman/new" element={<AdminEditOmbudsman />} />
          <Route path="disclosures/ombudsman/edit/:id" element={<AdminEditOmbudsman />} />
          <Route path="content/sliders" element={<AdminSliders />} />
          <Route path="content/sliders/new" element={<AdminEditSlider />} />
          <Route path="content/sliders/edit/:id" element={<AdminEditSlider />} />
          <Route path="content/home-page" element={<AdminHomePageContent />} />
          <Route path="content/statistics" element={<StatisticsSettings />} />
          <Route path="content/missed-call-banking" element={<AdminMissedCallBanking />} />
          <Route path="content/kyc-norms" element={<AdminKycNorms />} />
          <Route path="content/holidays" element={<AdminHolidays />} />
          <Route path="content/quick-access" element={<AdminQuickAccess />} />
          <Route path="content/quick-access/new" element={<AdminEditQuickAccess />} />
          <Route path="content/quick-access/edit/:id" element={<AdminEditQuickAccess />} />
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
    </Router>
  );
}

export default App;
