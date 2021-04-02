export const handleEnterPress = (e: any, maxHeight = 200) : boolean => {
    if(e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        return true;
    }

    const { style } = e.target;

    setTimeout(() => {
        style.height = '';
        style.height = e.target.scrollHeight + 'px';
    }, 0);

    if(e.target.scrollHeight <= maxHeight) {
        style.overflow = 'hidden';
    } else {
        style.overflow = 'auto';
    }

    return false;
}