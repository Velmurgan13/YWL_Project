import React, { lazy, Suspense } from "react";
import PageNotFound from "./pageNotFound";
 import LoadingIcon from "./E/Yosemitewestgate/assets/Icons/loading11.jpg";
import { Switch, Route } from "react-router-dom";
import ScrollToTop from "./PageScroll/ScrollToTop";
import { useLocation } from "react-router-dom";
import { propertyDataSelector } from "./Recoil/themeModule";
import { useRecoilValue } from "recoil";
// import component
//import { AnimatePresence } from "framer-motion";
//import { PageTransition } from '@steveeeie/react-page-transition';
import Homepage from "./E/Yosemitewestgate/Home/Homepage";
// import Homepage1 from "./E/montereystagecoachlodge/Home/Homepage";
import RoomComponent from "./E/InnerPages/Rooms/index";
import GalleryComponent from "./E/InnerPages/Gallery/PicturesPage/index";
import { AnimatedSwitch } from "react-router-transition";
const BookingConfirmationDetails = lazy(() =>
  import("./E/InnerPages/Reservation/BookingConfirmation/RoomConfirmation.js")
);
const AboutComponent = lazy(() => import("./E/InnerPages/About/index"));
const ContactComponent = lazy(() => import("./E/InnerPages/ContactUs/index"));
const FriendsComponent = lazy(() =>
  import("./E/InnerPages/PackageComponent/FriendsComponent/friendDetailsPage")
);
const FriendDetailsPage = lazy(() =>
  import("./E/InnerPages/PackageComponent/FriendsComponent/index")
);
const NewsComponent = lazy(() => import("./E/InnerPages/News/index"));
const NewsInnerPage = lazy(() => import("./E/InnerPages/News/newsInnerPage"));
const CleaningProtocolComponent = lazy(() =>
  import("./E/InnerPages/cleaningProtocal/index")
);
const JobsComponent = lazy(() => import("./E/InnerPages/Jobs/index"));
const JobsDetailsComponent = lazy(() =>
  import("./E/InnerPages/Jobs/jobsDetails")
);
const PetsComponent = lazy(() => import("./E/InnerPages/Pets/index"));
const PersonalDataRequestComponent = lazy(() =>
  import("./E/InnerPages/personalDataRequest/index")
);
const PrivacyPolicyComponent = lazy(() =>
  import("./E/InnerPages/PrivacyPolicy/index")
);
const TermsAndConditionComponent = lazy(() =>
  import("./E/InnerPages/TermsAndCondition/index")
);
const SiteMapComponent = lazy(() => import("./E/InnerPages/SiteMap/index"));
const AccessibilityComponent = lazy(() =>
  import("./E/InnerPages/Accessibility/index")
);
const VideoComponent = lazy(() => import("./E/InnerPages/Gallery/video/index"));
const FaqComponent = lazy(() => import("./E/InnerPages/FAQ/index"));
const WeatherComponent = lazy(() =>
  import("./E/InnerPages/DestinationPage/weather/index")
);
const SpecialComponent = lazy(() =>
  import("./E/InnerPages/PackageComponent/SpecialComponent/index")
);
const SpecialDetailsComponent = lazy(() =>
  import("./E/InnerPages/PackageComponent/SpecialComponent/specialDetails")
);
const CookiePolicyComponent = lazy(() =>
  import("./E/InnerPages/CookiePolicy/index")
);
const LostAndFoundComponent = lazy(() =>
  import("./E/InnerPages/LostAndFound/index")
);
const GroupTravelComponent = lazy(() =>
  import("./E/InnerPages/GroupTravel/index")
);
// const LuckyBuckCAfePage = lazy(() =>
//   import("./E/InnerPages/Packages/FriendsDetailsPage/lucky-buck-cafe")
// );
// const PizzaFactoryGroveLand = lazy(() =>
//   import("./E/InnerPages/Packages/FriendsDetailsPage/pizza-factory-groveland")
// );
const DirectionComponent = lazy(() => import("./E/InnerPages/Direction/index"));
const AttractionComponent = lazy(() =>
  import("./E/InnerPages/DestinationPage/AttractionPage/index")
);
const CreditCardpage = lazy(() => import("./E/InnerPages/CreditCard/index"));
const GuidedToursPage = lazy(() =>
  import("./E/InnerPages/DestinationPage/Guided-Tours/index")
);
const VirtualToursPage = lazy(() =>
  import("./E/InnerPages/Gallery/virtualTours/index")
);
const ThingsToDoPage = lazy(() =>
  import("./E/InnerPages/DestinationPage/Things-To-Do/index")
);
const Archivelist = lazy(() =>
  import("./E/InnerPages/BlogComponent/Archivelist")
);

const PicturesPageComponent = lazy(() =>
  import("./E/InnerPages/Gallery/PicturesPage/index")
);

const BlogComponent = lazy(() =>
  import("./E/InnerPages/BlogComponent/index")
);
const BlogDetailsPage = lazy(() =>
  import("./E/InnerPages/BlogComponent/blogDetailsPage")
);


const EventsPage = lazy(() =>
  import("./E/InnerPages/DestinationPage/Eventspage/index")
);
const EventsDetailsPage = lazy(() =>
  import("./E/InnerPages/DestinationPage/Eventspage/eventsDetailsPage")
);

const GuestRoomDetailsPage = lazy(() =>
  import("./E/InnerPages/Rooms/roomDetails/roomDetailsPage")
);
const ReservationComponent = lazy(() =>
  import("./E/InnerPages/Reservation/MainReservation")
);
const ReviewComponent = lazy(() => import("./E/InnerPages/Review/index"));
const ReviewDetailsPage = lazy(() =>
  import("./E/InnerPages/Review/review-details-page")
);
const AddReviewsPage = lazy(() => import("./E/InnerPages/Review/addreviews"));
const ParkingPage = lazy(() => import("./E/InnerPages/Parking/ParkingPage"));
const AttractionDetailsPage = lazy(() =>
  import("./E/InnerPages/DestinationPage/AttractionPage/attractionDetailsPage")
);
const PoolPage = lazy(() =>
  import("./E/InnerPages/StoredComponent/PoolAndSpa/index")
);
const TransportCommunicatePage = lazy(() =>
  //
  import("./E/InnerPages/TransportCommunicate/index")
);
const ArtCulturePage = lazy(() => import("./E/InnerPages/ArtandCulture/index"));
const TopReasonToStayPage = lazy(() =>
  import("./E/InnerPages/TopReasonToStay/index")
);
const ColumnGrid = lazy(() =>
  import("./E/InnerPages/Reservation/GridButtonTabs/colomnGrid")
);
const ReservationSlider = lazy(() =>
  import("./E/InnerPages/Reservation/reservationslider/reservationSlider")
);
const EntertainmentPage = lazy(() =>
  import("./E/InnerPages/StoredComponent/entertainmentPage/index")
);

const AppRouting = (props) => {
  const propertyData = useRecoilValue(propertyDataSelector);
  console.log(propertyData.propertySubdomain);
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className="mx-auto my-auto align-items-center text-center pt-5 mt-5">
          <img
            className="w-100 p-0 m-0 h-100 custom-height  text-center"
            src={LoadingIcon}
          />
        </div>
      }
    >
      <ScrollToTop></ScrollToTop>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        {(() => {
          switch (propertyData.propertySubdomain) {
            // case "montereystagecoachlodge":
            //   return <Route exact path={"/"} component={Homepage} />;
            case "yosemitewestgate":
              return <Route exact path={"/"} component={Homepage} />;
            default:
              return <Route exact path={"/"} component={Homepage} />;
          }
        })()}

        {/* {(() => {
        switch (propertyData.propertySubdomain) {
          case 'yosemitesouthgate':
            return <Route exact path={"/"} component={Homepage1} />;
          case 'yosemitewestgate':
            return <Route exact path={"/"} component={Homepage} />
          default:
            return <Route exact path={"/"} component={Homepage1} />;
        }
      })()}
     */}


      <Route exact path={"/overview"} render={() => <AboutComponent />} />
      <Route exact path={"/blog/archive_list"} component={Archivelist} />
      <Route exact path={"/blog/:page_url"} component={BlogDetailsPage} />
      <Route exact path={"/blog/category/:category"} component={BlogComponent} />
      <Route exact path={"/blog/archieve/:item"} component={BlogComponent} />
      <Route exact path={"/blog/archieve/:monthItem-:yearadded"} component={BlogComponent} />
      <Route exact path={"/blog"} component={BlogComponent} />
      
      <Route
          exact
          path={"/"}
          render={() => <Homepage propertyData={props.propertyData} />}
        />
        {/* <Route exact path={"/overview"} render={() => <AboutComponent />} /> */}
        <Route
          exact
          path={"/bookingConfirmation"}
          render={() => <BookingConfirmationDetails />}
        />
        <Route
          exact
          path={"/top-reasons-to-stay"}
          render={() => <TopReasonToStayPage />}
        />
        {/* <Route exact path={"/events"} component={EventsPage} /> */}


        <Route exact path={`/events`} component={EventsPage}>
          <Route path={`/events/:id?`}  component={EventsPage} />
        </Route>
        <Route
          exact
          path={`/events/:event_name`}
          render={(props) => <EventsDetailsPage {...props} />}
        />
        <Route exact path={"/guided-tours"} component={GuidedToursPage} />
        <Route
          exact
          path={"/contact-us"}
          render={() => <ContactComponent propertyData={props.propertyData} />}
        />
        <Route exact path={`/guestrooms`} component={RoomComponent} /> 
       <Route exact path={`/guestrooms/:subdomain`} render={(props) => <GuestRoomDetailsPage {...props}/>} />
        <Route  path={`/gallery`} component={GalleryComponent}>
          <Route path={`/gallery/:id?`}  component={GalleryComponent} />
        </Route>
        
        {/* <Route path={`/gallery/:pathname`} component={GalleryComponent} /> */}
        <Route
          exact
          path={`/lost-found`}
          render={() => (
            <LostAndFoundComponent propertyData={props.propertyData} />
          )}
        />
        <Route
          exact
          path={`/six-plus-booking`}
          render={() => (
            <GroupTravelComponent propertyData={props.propertyData} />
          )}
        />

        <Route exact path={`/packages`} component={SpecialComponent} />
        <Route
          exact
          path={`/packages/:subdomain`}
          component={SpecialDetailsComponent}
        />

        <Route exact path={`/news`} component={NewsComponent} />
        <Route exact path={`/news/:id/:news_title`} component={NewsInnerPage} />
        <Route exact path={`/faq`} component={FaqComponent} />
        <Route exact path={`/Jobs`} component={JobsComponent} />
        <Route
          exact
          path={`/Jobs-Details/:jid/:jtitle`}
          render={(props) => <JobsDetailsComponent {...props} />}
        />
        <Route
          exact
          path={`/Jobs-Details/:id/:job_sub_url`}
          render={(props) => <JobsDetailsComponent {...props} />}
        />
        <Route exact path={`/Pets`} component={PetsComponent} />
        <Route
          exact
          path={`/personal-info-request-form`}
          render={() => (
            <PersonalDataRequestComponent propertyData={props.propertyData} />
          )}
        />
        <Route exact path={`/weather`} component={WeatherComponent} />
        <Route exact path={`/reservations`} component={ReservationComponent} />
        {/* <Route
          exact
          path={`/ada-accessibility-amenities-services-facilities`}
          component={AccessibilityComponent}
        /> */}
        <Route
          exact
          path={`/privacy-policy`}
          component={PrivacyPolicyComponent}
        />
        <Route
          exact
          path={`/terms-conditions`}
          component={TermsAndConditionComponent}
        />
        <Route exact path={`/sitemap`} component={SiteMapComponent} />

        <Route exact path={`/news`} component={NewsComponent} />
        <Route exact path={`/news/:news_title`} component={NewsInnerPage} />
        <Route exact path={`/faq`} component={FaqComponent} />
        <Route exact path={`/Jobs`} component={JobsComponent} />
        <Route
          exact
          path={`/Jobs-Details/:jid/:jtitle`}
          render={(props) => <JobsDetailsComponent {...props} />}
        />
        <Route
          exact
          path={`/Jobs-Details/:id/:job_sub_url`}
          render={(props) => <JobsDetailsComponent {...props} />}
        />
        <Route exact path={`/Pets`} component={PetsComponent} />
        <Route
          exact
          path={`/personal-info-request-form`}
          render={() => (
            <PersonalDataRequestComponent propertyData={props.propertyData} />
          )}
        />
        <Route exact path={`/weather`} component={WeatherComponent} />
        <Route exact path={`/reservations`} component={ReservationComponent} />
        <Route
          exact
          path={`/ada-accessibility-amenities-services-facilities`}
          component={AccessibilityComponent}
        />
        <Route
          exact
          path={`/privacy-policy`}
          component={PrivacyPolicyComponent}
        />
        <Route
          exact
          path={`/terms-conditions`}
          component={TermsAndConditionComponent}
        />
        <Route exact path={`/sitemap`} component={SiteMapComponent} />

        <Route
          exact
          path={`/cleaning-protocols`}
          component={CleaningProtocolComponent}
        />

        <Route exact path={`/friends/`} component={FriendDetailsPage} />

        <Route exact path={`/cookies`} component={CookiePolicyComponent} />
        <Route
          exact
          path={`/friends-details-page/:sub_url`}
          component={FriendsComponent}
        />
        {/* <Route exact path={`/lucky-buck-acfe`} component={LuckyBuckCAfePage} />
        <Route exact path={`/san-remo-hotel`} component={SanRemoHotel} /> */}
        {/* <Route
          exact
          path={`/pizza-factory-groveland`}
          component={PizzaFactoryGroveLand}
        /> */}
        <Route exact path={`/directions`} component={DirectionComponent} />
     
        <Route exact path={`/directions/:attraction_name/:address1/:city/:state/:zip_code`} component={DirectionComponent} />
        <Route exact path={`/directions/:address1/:city/:state/:zip_code`} component={DirectionComponent} />


        <Route exact path={`/attractions`} component={AttractionComponent} />
        <Route exact path={`/credit-card`} component={CreditCardpage} />
        <Route exact path={`/3d-virtual-tours`} component={VirtualToursPage} />
        <Route exact path={`/things-to-do`} component={ThingsToDoPage} />
        <Route exact path={`/gallery`} component={PicturesPageComponent} />
        <Route exact path={`/videos`} component={VideoComponent} />
        <Route exact path={`/reviews`} component={ReviewComponent} />
        <Route
          exact
          path={`/reviews/:ReviewTitle/:review_id`}
          component={ReviewDetailsPage}
        />
        <Route exact path={`/add-reviews`} component={AddReviewsPage} />
        <Route
          exact
          path={`/attractions/:attraction_url`}
          component={AttractionDetailsPage}
        />
        <Route exact path={`/parking-page`} component={ParkingPage} />
        <Route exact path={`/pool`} component={PoolPage} />
        <Route
          exact
          path={`/transport-page`}
          component={TransportCommunicatePage}
        />
        <Route exact path={`/art-culture`} component={ArtCulturePage} />
        <Route exact path={`/column-grid`} component={ColumnGrid} />
        <Route
          exact
          path={`/reservation-slider`}
          component={ReservationSlider}
        />
        <Route exact path={`/entertainment`} component={EntertainmentPage} />
        <Route exact path={`/page-not-found`} component={PageNotFound} />
        <Route component={PageNotFound} />
      </AnimatedSwitch>
    </Suspense>
  );
};


export default AppRouting;
