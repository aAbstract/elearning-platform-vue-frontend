<script setup lang="ts">

// UI components
import TopBar from '../Components/Common/TopBar/TopBar.vue';
import AboutSection from '../Components/Home/AboutSection.vue';
import LecturesSection from '../Components/Home/LecturesSection/LecturesSection.vue';
import AboutInstructor from '../Components/Home/AboutInstructor.vue';
import BooksSection from '../Components/Home/BooksSection/BooksSection.vue';
import TestimonialsSection from '../Components/Home/TestimonialsSection/TestimonialsSection.vue';
import Footer from '../Components/Home/Footer.vue';
import LectureDetails from '../Components/Home/LectureDetails.vue';
import RechargeBalance from '../Components/Home/RechargeBalance.vue';

</script>

<template>
    <div id="home_page_cont">
        <RechargeBalance />
        <LectureDetails />
        <TopBar />
        <div id="home_page_banner_cont">
            <div id="home_page_banner_overlay"></div>
            <div id="home_page_banner"></div>
        </div>
        <AboutSection />
        <LecturesSection />
        <AboutInstructor />
        <BooksSection />
        <TestimonialsSection />
        <Footer />
    </div>
</template>

<style scoped>
#home_page_banner_overlay {
    position: absolute;
    height: 600px;
    width: 100%;
    background-color: var(--primary-color);
    opacity: 0.2;
}

#home_page_banner_cont {
    position: relative;
}

#home_page_banner {
    height: 600px;
    width: 100%;
    background: url('/images/crop_cover.jpg');
    background-size: cover;
}

/* desktop screen */
@media screen and (min-width: 1500px) {
    #home_page_banner_overlay {
        height: 750px;
    }

    #home_page_banner {
        height: 750px;
    }
}

/* tablet screen */
@media screen and (max-width: 1000px) {
    #home_page_banner_overlay {
        height: 400px;
    }

    #home_page_banner {
        height: 400px;
    }
}

/* mobile screen */
@media screen and (max-width: 500px) {
    #home_page_banner_overlay {
        height: 200px;
    }

    #home_page_banner {
        height: 200px;
        background-position: center;
    }
}
</style>