<script setup lang="ts">

// framework
import { useRouter } from 'vue-router';

// models
import { admin_nav_bar_item, admin_side_bar_item } from '../../Models/ui';

// lib
import { post_event } from '../../Lib/mediator';

// fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faBolt);
library.add(faDatabase);
library.add(faChartPie);
library.add(faGear);
library.add(faArrowRightFromBracket);

// global vars
const router = useRouter();

const side_nav_items = [
    {
        label: 'Statistics',
        icon: ['fa-solid', 'fa-chart-pie'],
        func: () => {
            router.push({
                path: '/admin',
                query: { panel_id: 'stats' },
            });
        },
    },
    {
        label: 'Admin Quick Actions',
        icon: ['fa-solid', 'fa-bolt'],
        func: () => {
            post_event('show_admin_side_bar_menu', {
                menu_items: [
                    {
                        label: 'Announcement',
                        icon: 'pi pi-volume-up',
                        command: () => {
                            router.push({
                                path: '/admin',
                                query: {
                                    panel_id: 'grid_controller',
                                    resource_id: 'announcements',
                                },
                            });
                        },
                    },
                    {
                        label: 'Coupons',
                        icon: 'pi pi-ticket',
                        command: () => {
                            router.push({
                                path: '/admin',
                                query: {
                                    panel_id: 'grid_controller',
                                    resource_id: 'coupons',
                                },
                            });
                        },
                    },
                    {
                        label: 'Close',
                        icon: 'pi pi-times',
                        command: () => { post_event('close_admin_side_bar_menu', {}); },
                    },

                ] as admin_side_bar_item[],
                index: 1,
            });
        },
    },
    {
        label: 'Database',
        icon: ['fa-solid', 'fa-database'],
        func: () => {
            post_event('show_admin_side_bar_menu', {
                menu_items: [
                    {
                        label: 'System Users',
                        icon: 'pi pi-user',
                        command: () => {
                            router.push({
                                path: '/admin',
                                query: {
                                    panel_id: 'grid_controller',
                                    resource_id: 'system_users',
                                },
                            });
                        },
                    },
                    {
                        label: 'Lectures',
                        icon: 'pi pi-book',
                        command: () => {
                            router.push({
                                path: '/admin',
                                query: {
                                    panel_id: 'grid_controller',
                                    resource_id: 'lectures',
                                },
                            });
                        },
                    },
                    {
                        label: 'Materials',
                        icon: 'pi pi-file',
                        command: () => {
                            router.push({
                                path: '/admin',
                                query: {
                                    panel_id: 'grid_controller',
                                    resource_id: 'materials',
                                },
                            });
                        },
                    },
                    {
                        label: 'Coupons',
                        icon: 'pi pi-ticket',
                        command: () => {
                            router.push({
                                path: '/admin',
                                query: {
                                    panel_id: 'grid_controller',
                                    resource_id: 'coupons',
                                },
                            });
                        },
                    },
                    {
                        label: 'Payments History',
                        icon: 'pi pi-dollar',
                        command: () => {
                            router.push({
                                path: '/admin',
                                query: {
                                    panel_id: 'grid_controller',
                                    resource_id: 'payments_history',
                                },
                            });
                        },
                    },
                    {
                        label: 'Close',
                        icon: 'pi pi-times',
                        command: () => { post_event('close_admin_side_bar_menu', {}); },
                    },

                ] as admin_side_bar_item[],
                index: 2,
            });
        },
    },
    {
        label: 'Settings',
        icon: ['fa-solid', 'fa-gear'],
        func: () => {
            post_event('show_admin_side_bar_menu', {
                menu_items: [
                    {
                        label: 'Home Page',
                        icon: 'pi pi-home',
                        command: () => { },
                    },
                    {
                        label: 'Theme',
                        icon: 'pi pi-palette',
                        command: () => { },
                    },
                    {
                        label: 'Fonts',
                        icon: 'pi pi-info-circle',
                        command: () => { },
                    },
                    {
                        label: 'Close',
                        icon: 'pi pi-times',
                        command: () => { post_event('close_admin_side_bar_menu', {}); },
                    },

                ] as admin_side_bar_item[],
                index: 3,
            });
        },
    },
    {
        label: 'Exit',
        icon: ['fa-solid', 'fa-arrow-right-from-bracket'],
        func: () => { router.push({ path: '/' }); },
    },
] as admin_nav_bar_item[];

</script>

<template>
    <div id="side_bar_cont">
        <div v-for="(item, index) in side_nav_items" :key="index" class="side_bar_icon" @click="item.func()">
            <FontAwesomeIcon :icon="item.icon" :title="item.label" />
        </div>
    </div>
</template>

<style scoped>
#side_bar_cont {
    height: 100%;
    width: 60px;
    background-color: var(--primary-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 16px;
}

.side_bar_icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-color);
    border: 2px solid white;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s ease;
    margin-bottom: 24px;
}

.side_bar_icon:hover {
    background-color: white;
    color: var(--primary-color);
}
</style>