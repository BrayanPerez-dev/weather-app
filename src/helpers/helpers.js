export const weatherStates = (state) =>{
    let stateImg
    switch (state) {
        case 'sn':
            stateImg = 'https://www.metaweather.com/static/img/weather/sn.svg'
            break;
        case 'sl':
            stateImg = 'https://www.metaweather.com/static/img/weather/sl.svg'
            break; 
        case 'h':
            stateImg = 'https://www.metaweather.com/static/img/weather/h.svg'
            break; 
        case 't':
            stateImg = 'https://www.metaweather.com/static/img/weather/t.svg'
            break;
        case 'hr':
            stateImg = 'https://www.metaweather.com/static/img/weather/hw.svg'
            break;
        case 'lr':
            stateImg = 'https://www.metaweather.com/static/img/weather/lr.svg'
            break;
        case 's':
            stateImg = 'https://www.metaweather.com/static/img/weather/s.svg'
            break;
         case 'hc':
            stateImg = 'https://www.metaweather.com/static/img/weather/hc.svg'
            break;
        case 'lc':
            stateImg = 'https://www.metaweather.com/static/img/weather/lr.svg'
            break;
        case 'c':
            stateImg = 'https://www.metaweather.com/static/img/weather/c.svg'
            break;
        default:
         stateImg = 'https://www.metaweather.com/static/img/weather/c.svg'
        break;
    }
    return stateImg
}

export const getCtoF = (c) => {
    return ((c / 5) * 9 + 32).toFixed(2);
  };

