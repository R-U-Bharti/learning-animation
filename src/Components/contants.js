export const transition = (duration = 0, delay = 0) => {
    return {
        duration: 1 + duration,
        delay: delay,
        stiffness: 100,
        damping: 30,
        mass: 1,
        type: "spring"
    }
}

const screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
export const uptoTabletView = screenSize <= 1024;
export const isMobileView = screenSize < 768;
export const isTabletView = screenSize >= 768 && screenSize<= 1024;