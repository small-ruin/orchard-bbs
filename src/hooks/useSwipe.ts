import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

// see https://stackoverflow.com/a/66620089/8101803
export function useSwipe(onSwipeLeft?: any, onSwipeRight?: any, rangeOffset = 4) {

    let firstTouch = 0
    
    // set user touch start position
    function onTouchStart(e: any) {
        firstTouch = e.nativeEvent.pageX
    }

    // when touch ends check for swipe directions
    function onTouchEnd(e: any){

        // get touch position and screen size
        const positionX = e.nativeEvent.pageX
        const range = windowWidth / rangeOffset

        // check if position is growing positively and has reached specified range
        if(positionX - firstTouch > range){
            onSwipeRight && onSwipeRight(e)
        }
        // check if position is growing negatively and has reached specified range
        else if(firstTouch - positionX > range){
            onSwipeLeft && onSwipeLeft(e)
        }
    }

    return {onTouchStart, onTouchEnd};
}