import { PlacementTypes } from './placement.type';
var caretOffset = 7;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'top') {
        return elDimensions.top - caretOffset;
    }
    if (alignment === 'bottom') {
        return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return undefined;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'left') {
        return elDimensions.left - caretOffset;
    }
    if (alignment === 'right') {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return undefined;
}
/**
 * Position helper for the popover directive.
 *
 * @export
 */
var PositionHelper = /** @class */ (function () {
    function PositionHelper() {
    }
    /**
     * Calculate vertical alignment position
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    };
    /**
     * Calculate vertical caret position
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += popoverPosition + popoverDimensions.height - window.innerHeight;
        }
        return result;
    };
    /**
     * Calculate horz alignment position
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    };
    /**
     * Calculate horz caret position
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += popoverPosition + popoverDimensions.width - window.innerWidth;
        }
        return result;
    };
    /**
     * Checks if the element's position should be flipped
     *
     * @memberOf PositionHelper
     */
    PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, spacing) {
        var flip = false;
        if (placement === 'right') {
            if (elDimensions.left + elDimensions.width + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            if (elDimensions.left - popoverDimensions.width - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'top') {
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'bottom') {
            if (elDimensions.top + elDimensions.height + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    };
    /**
     * Position caret
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionCaret = function (placement, elmDim, hostDim, caretDimensions, alignment) {
        var top = 0;
        var left = 0;
        if (placement === PlacementTypes.right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Position content
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionContent = function (placement, elmDim, hostDim, spacing, alignment) {
        var top = 0;
        var left = 0;
        if (placement === PlacementTypes.right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Determine placement based on flip
     *
     * @memberOf PositionHelper
     */
    PositionHelper.determinePlacement = function (placement, elmDim, hostDim, spacing) {
        var shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, spacing);
        if (shouldFlip) {
            if (placement === PlacementTypes.right) {
                return PlacementTypes.left;
            }
            else if (placement === PlacementTypes.left) {
                return PlacementTypes.right;
            }
            else if (placement === PlacementTypes.top) {
                return PlacementTypes.bottom;
            }
            else if (placement === PlacementTypes.bottom) {
                return PlacementTypes.top;
            }
        }
        return placement;
    };
    return PositionHelper;
}());
export { PositionHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9wb3NpdGlvbi9wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbEQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXRCLFNBQVMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFNBQVM7SUFDbEUsSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO1FBQ3ZCLE9BQU8sWUFBWSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7S0FDdkM7SUFFRCxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDMUIsT0FBTyxZQUFZLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztLQUN4RjtJQUVELElBQUksU0FBUyxLQUFLLFFBQVEsRUFBRTtRQUMxQixPQUFPLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNsRjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTO0lBQ3BFLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtRQUN4QixPQUFPLFlBQVksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFO1FBQ3pCLE9BQU8sWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDdkY7SUFFRCxJQUFJLFNBQVMsS0FBSyxR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S0FBSyxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQzlDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQzdDLElBQUksR0FBRyxjQUFjLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNoRjtRQUVELE9BQU8sRUFBRSxHQUFHLEtBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUNBQWtCLEdBQXpCLFVBQTBCLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU87UUFDM0QsSUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVsRixJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksU0FBUyxLQUFLLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RDLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQzthQUM1QjtpQkFBTSxJQUFJLFNBQVMsS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFO2dCQUM1QyxPQUFPLGNBQWMsQ0FBQyxLQUFLLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxTQUFTLEtBQUssY0FBYyxDQUFDLEdBQUcsRUFBRTtnQkFDM0MsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDO2FBQzlCO2lCQUFNLElBQUksU0FBUyxLQUFLLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Z0JBQzlDLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQzthQUMzQjtTQUNGO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQXBNRCxJQW9NQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi9wbGFjZW1lbnQudHlwZSc7XHJcblxyXG5jb25zdCBjYXJldE9mZnNldCA9IDc7XHJcblxyXG5mdW5jdGlvbiB2ZXJ0aWNhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCkge1xyXG4gIGlmIChhbGlnbm1lbnQgPT09ICd0b3AnKSB7XHJcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLnRvcCAtIGNhcmV0T2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgaWYgKGFsaWdubWVudCA9PT0gJ2JvdHRvbScpIHtcclxuICAgIHJldHVybiBlbERpbWVuc2lvbnMudG9wICsgZWxEaW1lbnNpb25zLmhlaWdodCAtIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCArIGNhcmV0T2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgaWYgKGFsaWdubWVudCA9PT0gJ2NlbnRlcicpIHtcclxuICAgIHJldHVybiBlbERpbWVuc2lvbnMudG9wICsgZWxEaW1lbnNpb25zLmhlaWdodCAvIDIgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLyAyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCkge1xyXG4gIGlmIChhbGlnbm1lbnQgPT09ICdsZWZ0Jykge1xyXG4gICAgcmV0dXJuIGVsRGltZW5zaW9ucy5sZWZ0IC0gY2FyZXRPZmZzZXQ7XHJcbiAgfVxyXG5cclxuICBpZiAoYWxpZ25tZW50ID09PSAncmlnaHQnKSB7XHJcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLmxlZnQgKyBlbERpbWVuc2lvbnMud2lkdGggLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCArIGNhcmV0T2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgaWYgKGFsaWdubWVudCA9PT0gJ2NlbnRlcicpIHtcclxuICAgIHJldHVybiBlbERpbWVuc2lvbnMubGVmdCArIGVsRGltZW5zaW9ucy53aWR0aCAvIDIgLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAvIDI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogUG9zaXRpb24gaGVscGVyIGZvciB0aGUgcG9wb3ZlciBkaXJlY3RpdmUuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQb3NpdGlvbkhlbHBlciB7XHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHZlcnRpY2FsIGFsaWdubWVudCBwb3NpdGlvblxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXHJcbiAgICovXHJcbiAgc3RhdGljIGNhbGN1bGF0ZVZlcnRpY2FsQWxpZ25tZW50KGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk6IG51bWJlciB7XHJcbiAgICBsZXQgcmVzdWx0ID0gdmVydGljYWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgKyBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgcmVzdWx0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgdmVydGljYWwgY2FyZXQgcG9zaXRpb25cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxyXG4gICAqL1xyXG4gIHN0YXRpYyBjYWxjdWxhdGVWZXJ0aWNhbENhcmV0KGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50KTogbnVtYmVyIHtcclxuICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgaWYgKGFsaWdubWVudCA9PT0gJ3RvcCcpIHtcclxuICAgICAgcmVzdWx0ID0gZWxEaW1lbnNpb25zLmhlaWdodCAvIDIgLSBjYXJldERpbWVuc2lvbnMuaGVpZ2h0IC8gMiArIGNhcmV0T2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhbGlnbm1lbnQgPT09ICdib3R0b20nKSB7XHJcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAtIGVsRGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXREaW1lbnNpb25zLmhlaWdodCAvIDIgLSBjYXJldE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWxpZ25tZW50ID09PSAnY2VudGVyJykge1xyXG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXREaW1lbnNpb25zLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9wb3ZlclBvc2l0aW9uID0gdmVydGljYWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xyXG4gICAgaWYgKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICByZXN1bHQgKz0gcG9wb3ZlclBvc2l0aW9uICsgcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgaG9yeiBhbGlnbm1lbnQgcG9zaXRpb25cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxyXG4gICAqL1xyXG4gIHN0YXRpYyBjYWxjdWxhdGVIb3Jpem9udGFsQWxpZ25tZW50KGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk6IG51bWJlciB7XHJcbiAgICBsZXQgcmVzdWx0ID0gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgcmVzdWx0ID0gd2luZG93LmlubmVyV2lkdGggLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIGhvcnogY2FyZXQgcG9zaXRpb25cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxyXG4gICAqL1xyXG4gIHN0YXRpYyBjYWxjdWxhdGVIb3Jpem9udGFsQ2FyZXQoZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpOiBudW1iZXIge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICBpZiAoYWxpZ25tZW50ID09PSAnbGVmdCcpIHtcclxuICAgICAgcmVzdWx0ID0gZWxEaW1lbnNpb25zLndpZHRoIC8gMiAtIGNhcmV0RGltZW5zaW9ucy53aWR0aCAvIDIgKyBjYXJldE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWxpZ25tZW50ID09PSAncmlnaHQnKSB7XHJcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC0gZWxEaW1lbnNpb25zLndpZHRoIC8gMiAtIGNhcmV0RGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWxpZ25tZW50ID09PSAnY2VudGVyJykge1xyXG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldERpbWVuc2lvbnMud2lkdGggLyAyO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvcG92ZXJQb3NpdGlvbiA9IGhvcml6b250YWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xyXG4gICAgaWYgKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgcmVzdWx0ICs9IHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGUgZWxlbWVudCdzIHBvc2l0aW9uIHNob3VsZCBiZSBmbGlwcGVkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcclxuICAgKi9cclxuICBzdGF0aWMgc2hvdWxkRmxpcChlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBwbGFjZW1lbnQsIHNwYWNpbmcpOiBib29sZWFuIHtcclxuICAgIGxldCBmbGlwID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICBpZiAoZWxEaW1lbnNpb25zLmxlZnQgKyBlbERpbWVuc2lvbnMud2lkdGggKyBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCArIHNwYWNpbmcgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgIGZsaXAgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgIGlmIChlbERpbWVuc2lvbnMubGVmdCAtIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC0gc3BhY2luZyA8IDApIHtcclxuICAgICAgICBmbGlwID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGFjZW1lbnQgPT09ICd0b3AnKSB7XHJcbiAgICAgIGlmIChlbERpbWVuc2lvbnMudG9wIC0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0IC0gc3BhY2luZyA8IDApIHtcclxuICAgICAgICBmbGlwID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XHJcbiAgICAgIGlmIChlbERpbWVuc2lvbnMudG9wICsgZWxEaW1lbnNpb25zLmhlaWdodCArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCArIHNwYWNpbmcgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgICBmbGlwID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmbGlwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gY2FyZXRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxyXG4gICAqL1xyXG4gIHN0YXRpYyBwb3NpdGlvbkNhcmV0KHBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk6IGFueSB7XHJcbiAgICBsZXQgdG9wID0gMDtcclxuICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5yaWdodCkge1xyXG4gICAgICBsZWZ0ID0gLTc7XHJcbiAgICAgIHRvcCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZVZlcnRpY2FsQ2FyZXQoaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XHJcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMubGVmdCkge1xyXG4gICAgICBsZWZ0ID0gZWxtRGltLndpZHRoO1xyXG4gICAgICB0b3AgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVWZXJ0aWNhbENhcmV0KGhvc3REaW0sIGVsbURpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xyXG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLnRvcCkge1xyXG4gICAgICB0b3AgPSBlbG1EaW0uaGVpZ2h0O1xyXG4gICAgICBsZWZ0ID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlSG9yaXpvbnRhbENhcmV0KGhvc3REaW0sIGVsbURpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xyXG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLmJvdHRvbSkge1xyXG4gICAgICB0b3AgPSAtNztcclxuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxDYXJldChob3N0RGltLCBlbG1EaW0sIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBvc2l0aW9uIGNvbnRlbnRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxyXG4gICAqL1xyXG4gIHN0YXRpYyBwb3NpdGlvbkNvbnRlbnQocGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIHNwYWNpbmcsIGFsaWdubWVudCk6IGFueSB7XHJcbiAgICBsZXQgdG9wID0gMDtcclxuICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5yaWdodCkge1xyXG4gICAgICBsZWZ0ID0gaG9zdERpbS5sZWZ0ICsgaG9zdERpbS53aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgIHRvcCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZVZlcnRpY2FsQWxpZ25tZW50KGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcclxuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5sZWZ0KSB7XHJcbiAgICAgIGxlZnQgPSBob3N0RGltLmxlZnQgLSBlbG1EaW0ud2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICB0b3AgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVWZXJ0aWNhbEFsaWdubWVudChob3N0RGltLCBlbG1EaW0sIGFsaWdubWVudCk7XHJcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMudG9wKSB7XHJcbiAgICAgIHRvcCA9IGhvc3REaW0udG9wIC0gZWxtRGltLmhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgIGxlZnQgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVIb3Jpem9udGFsQWxpZ25tZW50KGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcclxuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5ib3R0b20pIHtcclxuICAgICAgdG9wID0gaG9zdERpbS50b3AgKyBob3N0RGltLmhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgIGxlZnQgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVIb3Jpem9udGFsQWxpZ25tZW50KGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZSBwbGFjZW1lbnQgYmFzZWQgb24gZmxpcFxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXHJcbiAgICovXHJcbiAgc3RhdGljIGRldGVybWluZVBsYWNlbWVudChwbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgc3BhY2luZyk6IGFueSB7XHJcbiAgICBjb25zdCBzaG91bGRGbGlwID0gUG9zaXRpb25IZWxwZXIuc2hvdWxkRmxpcChob3N0RGltLCBlbG1EaW0sIHBsYWNlbWVudCwgc3BhY2luZyk7XHJcblxyXG4gICAgaWYgKHNob3VsZEZsaXApIHtcclxuICAgICAgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMucmlnaHQpIHtcclxuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMubGVmdDtcclxuICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLmxlZnQpIHtcclxuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMucmlnaHQ7XHJcbiAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy50b3ApIHtcclxuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMuYm90dG9tO1xyXG4gICAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMuYm90dG9tKSB7XHJcbiAgICAgICAgcmV0dXJuIFBsYWNlbWVudFR5cGVzLnRvcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwbGFjZW1lbnQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==