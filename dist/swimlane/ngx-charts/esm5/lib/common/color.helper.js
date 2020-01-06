import { __read, __spread, __values } from "tslib";
import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantile } from 'd3-scale';
import { colorSets } from '../utils/color-sets';
var ColorHelper = /** @class */ (function () {
    function ColorHelper(scheme, type, domain, customColors) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        var colorScale;
        if (type === 'quantile') {
            colorScale = scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            // linear schemes must have at least 2 colors
            var colorDomain = __spread(scheme.domain);
            if (colorDomain.length === 1) {
                colorDomain.push(colorDomain[0]);
                this.colorDomain = colorDomain;
            }
            var points = range(0, 1, 1.0 / colorDomain.length);
            colorScale = scaleLinear()
                .domain(points)
                .range(colorDomain);
        }
        return colorScale;
    };
    ColorHelper.prototype.getColor = function (value) {
        if (value === undefined || value === null) {
            throw new Error('Value can not be null');
        }
        if (this.scaleType === 'linear') {
            var valueScale = scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return this.scale(valueScale(value));
        }
        else {
            if (typeof this.customColors === 'function') {
                return this.customColors(value);
            }
            var formattedValue_1 = value.toString();
            var found = void 0; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(function (mapping) {
                    return mapping.name.toLowerCase() === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    };
    ColorHelper.prototype.getLinearGradientStops = function (value, start) {
        var e_1, _a;
        if (start === undefined) {
            start = this.domain[0];
        }
        var valueScale = scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        var colorValueScale = scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        var endColor = this.getColor(value);
        // generate the stops
        var startVal = valueScale(start);
        var startColor = this.getColor(start);
        var endVal = valueScale(value);
        var i = 1;
        var currentVal = startVal;
        var stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            var color = this.colorDomain[i];
            var offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color: color,
                offset: offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                try {
                    for (var stops_1 = __values(stops), stops_1_1 = stops_1.next(); !stops_1_1.done; stops_1_1 = stops_1.next()) {
                        var s = stops_1_1.value;
                        s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (stops_1_1 && !stops_1_1.done && (_a = stops_1.return)) _a.call(stops_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        return stops;
    };
    return ColorHelper;
}());
export { ColorHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NvbG9yLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRDtJQU9FLHFCQUFZLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQWE7UUFDN0MsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO2dCQUN4QixPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFFakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELHlDQUFtQixHQUFuQixVQUFvQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU07UUFDdEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO2dCQUN4QixPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLFVBQVUsQ0FBQztRQUNmLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUN2QixVQUFVLEdBQUcsYUFBYSxFQUFFO2lCQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25CO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzdCLFVBQVUsR0FBRyxZQUFZLEVBQUU7aUJBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2lCQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkI7YUFBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsNkNBQTZDO1lBQzdDLElBQU0sV0FBVyxZQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzthQUNoQztZQUVELElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsVUFBVSxHQUFHLFdBQVcsRUFBRTtpQkFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDZCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkI7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLEtBQUs7UUFDWixJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQU0sVUFBVSxHQUFHLFdBQVcsRUFBRTtpQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ25CLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWpCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUFFO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakM7WUFFRCxJQUFNLGdCQUFjLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLElBQUksS0FBSyxTQUFLLENBQUMsQ0FBQyx5QkFBeUI7WUFDekMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckQsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztvQkFDcEMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLGdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsNENBQXNCLEdBQXRCLFVBQXVCLEtBQUssRUFBRSxLQUFLOztRQUNqQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7UUFFRCxJQUFNLFVBQVUsR0FBRyxXQUFXLEVBQUU7YUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakIsSUFBTSxlQUFlLEdBQUcsU0FBUyxFQUFFO2FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3hCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEMscUJBQXFCO1FBQ3JCLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDVCxLQUFLLEVBQUUsVUFBVTtZQUNqQixNQUFNLEVBQUUsUUFBUTtZQUNoQixjQUFjLEVBQUUsUUFBUTtZQUN4QixPQUFPLEVBQUUsQ0FBQztTQUNYLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDekQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO2dCQUN0QixDQUFDLEVBQUUsQ0FBQztnQkFDSixTQUFTO2FBQ1Y7WUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxRSxNQUFNO2FBQ1A7WUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNULEtBQUssT0FBQTtnQkFDTCxNQUFNLFFBQUE7Z0JBQ04sT0FBTyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7WUFDSCxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLENBQUMsRUFBRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVCxLQUFLLEVBQUUsUUFBUTtnQkFDZixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCx5Q0FBeUM7WUFDekMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFOztvQkFDMUMsS0FBZ0IsSUFBQSxVQUFBLFNBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO3dCQUFsQixJQUFNLENBQUMsa0JBQUE7d0JBQ1YsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztxQkFDaEU7Ozs7Ozs7OzthQUNGO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUE5SkQsSUE4SkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByYW5nZSB9IGZyb20gJ2QzLWFycmF5JztcclxuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciwgc2NhbGVPcmRpbmFsLCBzY2FsZVF1YW50aWxlIH0gZnJvbSAnZDMtc2NhbGUnO1xyXG5cclxuaW1wb3J0IHsgY29sb3JTZXRzIH0gZnJvbSAnLi4vdXRpbHMvY29sb3Itc2V0cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29sb3JIZWxwZXIge1xyXG4gIHNjYWxlOiBhbnk7XHJcbiAgc2NhbGVUeXBlOiBhbnk7XHJcbiAgY29sb3JEb21haW46IGFueVtdO1xyXG4gIGRvbWFpbjogYW55O1xyXG4gIGN1c3RvbUNvbG9yczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihzY2hlbWUsIHR5cGUsIGRvbWFpbiwgY3VzdG9tQ29sb3JzPykge1xyXG4gICAgaWYgKHR5cGVvZiBzY2hlbWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHNjaGVtZSA9IGNvbG9yU2V0cy5maW5kKGNzID0+IHtcclxuICAgICAgICByZXR1cm4gY3MubmFtZSA9PT0gc2NoZW1lO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuY29sb3JEb21haW4gPSBzY2hlbWUuZG9tYWluO1xyXG4gICAgdGhpcy5zY2FsZVR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5kb21haW4gPSBkb21haW47XHJcbiAgICB0aGlzLmN1c3RvbUNvbG9ycyA9IGN1c3RvbUNvbG9ycztcclxuXHJcbiAgICB0aGlzLnNjYWxlID0gdGhpcy5nZW5lcmF0ZUNvbG9yU2NoZW1lKHNjaGVtZSwgdHlwZSwgdGhpcy5kb21haW4pO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVDb2xvclNjaGVtZShzY2hlbWUsIHR5cGUsIGRvbWFpbikge1xyXG4gICAgaWYgKHR5cGVvZiBzY2hlbWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHNjaGVtZSA9IGNvbG9yU2V0cy5maW5kKGNzID0+IHtcclxuICAgICAgICByZXR1cm4gY3MubmFtZSA9PT0gc2NoZW1lO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxldCBjb2xvclNjYWxlO1xyXG4gICAgaWYgKHR5cGUgPT09ICdxdWFudGlsZScpIHtcclxuICAgICAgY29sb3JTY2FsZSA9IHNjYWxlUXVhbnRpbGUoKVxyXG4gICAgICAgIC5yYW5nZShzY2hlbWUuZG9tYWluKVxyXG4gICAgICAgIC5kb21haW4oZG9tYWluKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIGNvbG9yU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxyXG4gICAgICAgIC5yYW5nZShzY2hlbWUuZG9tYWluKVxyXG4gICAgICAgIC5kb21haW4oZG9tYWluKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgLy8gbGluZWFyIHNjaGVtZXMgbXVzdCBoYXZlIGF0IGxlYXN0IDIgY29sb3JzXHJcbiAgICAgIGNvbnN0IGNvbG9yRG9tYWluID0gWy4uLnNjaGVtZS5kb21haW5dO1xyXG4gICAgICBpZiAoY29sb3JEb21haW4ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgY29sb3JEb21haW4ucHVzaChjb2xvckRvbWFpblswXSk7XHJcbiAgICAgICAgdGhpcy5jb2xvckRvbWFpbiA9IGNvbG9yRG9tYWluO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwb2ludHMgPSByYW5nZSgwLCAxLCAxLjAgLyBjb2xvckRvbWFpbi5sZW5ndGgpO1xyXG4gICAgICBjb2xvclNjYWxlID0gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC5kb21haW4ocG9pbnRzKVxyXG4gICAgICAgIC5yYW5nZShjb2xvckRvbWFpbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbG9yU2NhbGU7XHJcbiAgfVxyXG5cclxuICBnZXRDb2xvcih2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBjYW4gbm90IGJlIG51bGwnKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgY29uc3QgdmFsdWVTY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgICAuZG9tYWluKHRoaXMuZG9tYWluKVxyXG4gICAgICAgIC5yYW5nZShbMCwgMV0pO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuc2NhbGUodmFsdWVTY2FsZSh2YWx1ZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1c3RvbUNvbG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbUNvbG9ycyh2YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgbGV0IGZvdW5kOiBhbnk7IC8vIHRvZG8gdHlwZSBjdXN0b21Db2xvcnNcclxuICAgICAgaWYgKHRoaXMuY3VzdG9tQ29sb3JzICYmIHRoaXMuY3VzdG9tQ29sb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmb3VuZCA9IHRoaXMuY3VzdG9tQ29sb3JzLmZpbmQobWFwcGluZyA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbWFwcGluZy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IGZvcm1hdHRlZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgIHJldHVybiBmb3VuZC52YWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldExpbmVhckdyYWRpZW50U3RvcHModmFsdWUsIHN0YXJ0KSB7XHJcbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdGFydCA9IHRoaXMuZG9tYWluWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbHVlU2NhbGUgPSBzY2FsZUxpbmVhcigpXHJcbiAgICAgIC5kb21haW4odGhpcy5kb21haW4pXHJcbiAgICAgIC5yYW5nZShbMCwgMV0pO1xyXG5cclxuICAgIGNvbnN0IGNvbG9yVmFsdWVTY2FsZSA9IHNjYWxlQmFuZCgpXHJcbiAgICAgIC5kb21haW4odGhpcy5jb2xvckRvbWFpbilcclxuICAgICAgLnJhbmdlKFswLCAxXSk7XHJcblxyXG4gICAgY29uc3QgZW5kQ29sb3IgPSB0aGlzLmdldENvbG9yKHZhbHVlKTtcclxuXHJcbiAgICAvLyBnZW5lcmF0ZSB0aGUgc3RvcHNcclxuICAgIGNvbnN0IHN0YXJ0VmFsID0gdmFsdWVTY2FsZShzdGFydCk7XHJcbiAgICBjb25zdCBzdGFydENvbG9yID0gdGhpcy5nZXRDb2xvcihzdGFydCk7XHJcblxyXG4gICAgY29uc3QgZW5kVmFsID0gdmFsdWVTY2FsZSh2YWx1ZSk7XHJcbiAgICBsZXQgaSA9IDE7XHJcbiAgICBsZXQgY3VycmVudFZhbCA9IHN0YXJ0VmFsO1xyXG4gICAgY29uc3Qgc3RvcHMgPSBbXTtcclxuXHJcbiAgICBzdG9wcy5wdXNoKHtcclxuICAgICAgY29sb3I6IHN0YXJ0Q29sb3IsXHJcbiAgICAgIG9mZnNldDogc3RhcnRWYWwsXHJcbiAgICAgIG9yaWdpbmFsT2Zmc2V0OiBzdGFydFZhbCxcclxuICAgICAgb3BhY2l0eTogMVxyXG4gICAgfSk7XHJcblxyXG4gICAgd2hpbGUgKGN1cnJlbnRWYWwgPCBlbmRWYWwgJiYgaSA8IHRoaXMuY29sb3JEb21haW4ubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvckRvbWFpbltpXTtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gY29sb3JWYWx1ZVNjYWxlKGNvbG9yKTtcclxuICAgICAgaWYgKG9mZnNldCA8PSBzdGFydFZhbCkge1xyXG4gICAgICAgIGkrKztcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9mZnNldC50b0ZpeGVkKDQpID49IChlbmRWYWwgLSBjb2xvclZhbHVlU2NhbGUuYmFuZHdpZHRoKCkpLnRvRml4ZWQoNCkpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RvcHMucHVzaCh7XHJcbiAgICAgICAgY29sb3IsXHJcbiAgICAgICAgb2Zmc2V0LFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfSk7XHJcbiAgICAgIGN1cnJlbnRWYWwgPSBvZmZzZXQ7XHJcbiAgICAgIGkrKztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RvcHNbc3RvcHMubGVuZ3RoIC0gMV0ub2Zmc2V0IDwgMTAwKSB7XHJcbiAgICAgIHN0b3BzLnB1c2goe1xyXG4gICAgICAgIGNvbG9yOiBlbmRDb2xvcixcclxuICAgICAgICBvZmZzZXQ6IGVuZFZhbCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbmRWYWwgPT09IHN0YXJ0VmFsKSB7XHJcbiAgICAgIHN0b3BzWzBdLm9mZnNldCA9IDA7XHJcbiAgICAgIHN0b3BzWzFdLm9mZnNldCA9IDEwMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIG5vcm1hbGl6ZSB0aGUgb2Zmc2V0cyBpbnRvIHBlcmNlbnRhZ2VzXHJcbiAgICAgIGlmIChzdG9wc1tzdG9wcy5sZW5ndGggLSAxXS5vZmZzZXQgIT09IDEwMCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBzdG9wcykge1xyXG4gICAgICAgICAgcy5vZmZzZXQgPSAoKHMub2Zmc2V0IC0gc3RhcnRWYWwpIC8gKGVuZFZhbCAtIHN0YXJ0VmFsKSkgKiAxMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0b3BzO1xyXG4gIH1cclxufVxyXG4iXX0=