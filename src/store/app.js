import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

const useAppStore = defineStore("app", {
    state: () => ({
        sidebar: {
            opened: true,
            withoutAnimation: false
        },
        device: 'desktop',
        size: 'default',
    }),
    actions: {
        toggleSidebar() {
            this.sidebar.opened = !this.sidebar.opened
            this.sidebar.withoutAnimation = false
            if (this.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
        },
        closeSidebar(withoutAnimation) {
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = withoutAnimation
        },
        toggleDevice(device) {
            this.device = device
        },
        setSize(size) {
            this.size = size
        }
    }
})

export { useAppStore };