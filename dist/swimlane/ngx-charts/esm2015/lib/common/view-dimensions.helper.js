export function calculateViewDimensions({ width, height, margins, showXAxis = false, showYAxis = false, xAxisHeight = 0, yAxisWidth = 0, showXLabel = false, showYLabel = false, showLegend = false, legendType = 'ordinal', legendPosition = 'right', columns = 12 }) {
    let xOffset = margins[3];
    let chartWidth = width;
    let chartHeight = height - margins[0] - margins[2];
    if (showLegend && legendPosition === 'right') {
        if (legendType === 'ordinal') {
            columns -= 2;
        }
        else {
            columns -= 1;
        }
    }
    chartWidth = (chartWidth * columns) / 12;
    chartWidth = chartWidth - margins[1] - margins[3];
    if (showXAxis) {
        chartHeight -= 5;
        chartHeight -= xAxisHeight;
        if (showXLabel) {
            // text height + spacing between axis label and tick labels
            const offset = 25 + 5;
            chartHeight -= offset;
        }
    }
    if (showYAxis) {
        chartWidth -= 5;
        chartWidth -= yAxisWidth;
        xOffset += yAxisWidth;
        xOffset += 10;
        if (showYLabel) {
            // text height + spacing between axis label and tick labels
            const offset = 25 + 5;
            chartWidth -= offset;
            xOffset += offset;
        }
    }
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
    return {
        width: Math.floor(chartWidth),
        height: Math.floor(chartHeight),
        xOffset: Math.floor(xOffset)
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaW1lbnNpb25zLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxFQUN0QyxLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEdBQUcsS0FBSyxFQUNqQixTQUFTLEdBQUcsS0FBSyxFQUNqQixXQUFXLEdBQUcsQ0FBQyxFQUNmLFVBQVUsR0FBRyxDQUFDLEVBQ2QsVUFBVSxHQUFHLEtBQUssRUFDbEIsVUFBVSxHQUFHLEtBQUssRUFDbEIsVUFBVSxHQUFHLEtBQUssRUFDbEIsVUFBVSxHQUFHLFNBQVMsRUFDdEIsY0FBYyxHQUFHLE9BQU8sRUFDeEIsT0FBTyxHQUFHLEVBQUUsRUFDYjtJQUNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkQsSUFBSSxVQUFVLElBQUksY0FBYyxLQUFLLE9BQU8sRUFBRTtRQUM1QyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNkO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxDQUFDO1NBQ2Q7S0FDRjtJQUVELFVBQVUsR0FBRyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFekMsVUFBVSxHQUFHLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxELElBQUksU0FBUyxFQUFFO1FBQ2IsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUNqQixXQUFXLElBQUksV0FBVyxDQUFDO1FBRTNCLElBQUksVUFBVSxFQUFFO1lBQ2QsMkRBQTJEO1lBQzNELE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEIsV0FBVyxJQUFJLE1BQU0sQ0FBQztTQUN2QjtLQUNGO0lBRUQsSUFBSSxTQUFTLEVBQUU7UUFDYixVQUFVLElBQUksQ0FBQyxDQUFDO1FBQ2hCLFVBQVUsSUFBSSxVQUFVLENBQUM7UUFDekIsT0FBTyxJQUFJLFVBQVUsQ0FBQztRQUN0QixPQUFPLElBQUksRUFBRSxDQUFDO1FBRWQsSUFBSSxVQUFVLEVBQUU7WUFDZCwyREFBMkQ7WUFDM0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QixVQUFVLElBQUksTUFBTSxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxNQUFNLENBQUM7U0FDbkI7S0FDRjtJQUVELFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFdkMsT0FBTztRQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQzdCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBWaWV3RGltZW5zaW9ucyB7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICB4T2Zmc2V0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgd2lkdGgsXHJcbiAgaGVpZ2h0LFxyXG4gIG1hcmdpbnMsXHJcbiAgc2hvd1hBeGlzID0gZmFsc2UsXHJcbiAgc2hvd1lBeGlzID0gZmFsc2UsXHJcbiAgeEF4aXNIZWlnaHQgPSAwLFxyXG4gIHlBeGlzV2lkdGggPSAwLFxyXG4gIHNob3dYTGFiZWwgPSBmYWxzZSxcclxuICBzaG93WUxhYmVsID0gZmFsc2UsXHJcbiAgc2hvd0xlZ2VuZCA9IGZhbHNlLFxyXG4gIGxlZ2VuZFR5cGUgPSAnb3JkaW5hbCcsXHJcbiAgbGVnZW5kUG9zaXRpb24gPSAncmlnaHQnLFxyXG4gIGNvbHVtbnMgPSAxMlxyXG59KTogVmlld0RpbWVuc2lvbnMge1xyXG4gIGxldCB4T2Zmc2V0ID0gbWFyZ2luc1szXTtcclxuICBsZXQgY2hhcnRXaWR0aCA9IHdpZHRoO1xyXG4gIGxldCBjaGFydEhlaWdodCA9IGhlaWdodCAtIG1hcmdpbnNbMF0gLSBtYXJnaW5zWzJdO1xyXG5cclxuICBpZiAoc2hvd0xlZ2VuZCAmJiBsZWdlbmRQb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgaWYgKGxlZ2VuZFR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBjb2x1bW5zIC09IDI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2x1bW5zIC09IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFydFdpZHRoID0gKGNoYXJ0V2lkdGggKiBjb2x1bW5zKSAvIDEyO1xyXG5cclxuICBjaGFydFdpZHRoID0gY2hhcnRXaWR0aCAtIG1hcmdpbnNbMV0gLSBtYXJnaW5zWzNdO1xyXG5cclxuICBpZiAoc2hvd1hBeGlzKSB7XHJcbiAgICBjaGFydEhlaWdodCAtPSA1O1xyXG4gICAgY2hhcnRIZWlnaHQgLT0geEF4aXNIZWlnaHQ7XHJcblxyXG4gICAgaWYgKHNob3dYTGFiZWwpIHtcclxuICAgICAgLy8gdGV4dCBoZWlnaHQgKyBzcGFjaW5nIGJldHdlZW4gYXhpcyBsYWJlbCBhbmQgdGljayBsYWJlbHNcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gMjUgKyA1O1xyXG4gICAgICBjaGFydEhlaWdodCAtPSBvZmZzZXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoc2hvd1lBeGlzKSB7XHJcbiAgICBjaGFydFdpZHRoIC09IDU7XHJcbiAgICBjaGFydFdpZHRoIC09IHlBeGlzV2lkdGg7XHJcbiAgICB4T2Zmc2V0ICs9IHlBeGlzV2lkdGg7XHJcbiAgICB4T2Zmc2V0ICs9IDEwO1xyXG5cclxuICAgIGlmIChzaG93WUxhYmVsKSB7XHJcbiAgICAgIC8vIHRleHQgaGVpZ2h0ICsgc3BhY2luZyBiZXR3ZWVuIGF4aXMgbGFiZWwgYW5kIHRpY2sgbGFiZWxzXHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IDI1ICsgNTtcclxuICAgICAgY2hhcnRXaWR0aCAtPSBvZmZzZXQ7XHJcbiAgICAgIHhPZmZzZXQgKz0gb2Zmc2V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhcnRXaWR0aCA9IE1hdGgubWF4KDAsIGNoYXJ0V2lkdGgpO1xyXG4gIGNoYXJ0SGVpZ2h0ID0gTWF0aC5tYXgoMCwgY2hhcnRIZWlnaHQpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgd2lkdGg6IE1hdGguZmxvb3IoY2hhcnRXaWR0aCksXHJcbiAgICBoZWlnaHQ6IE1hdGguZmxvb3IoY2hhcnRIZWlnaHQpLFxyXG4gICAgeE9mZnNldDogTWF0aC5mbG9vcih4T2Zmc2V0KVxyXG4gIH07XHJcbn1cclxuIl19