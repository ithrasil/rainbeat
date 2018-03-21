export const keyPress = () => {
    const trackInput = document.querySelector('#trackInput');

    if (event.keyCode == 32 && document.activeElement != trackInput) {
        this.playSwitch();
    }
}