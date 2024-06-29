'use client';
export const setCookie = (cname: any, cValue: string, exTime: any) => {
    const d = new Date();
    d.setTime(d.getTime() + timeToMillisecond(exTime));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + btoa(cValue) + ';' + expires + ';path=/';
};
export const getCookie = (cname: string, decode=true) => {
    try {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (decode){
                if (c.indexOf(name) === 0) {
                    return window.atob(c.substring(name.length, c.length));
                }
            }else {
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
        }
    } catch (err) {
        console.log('Error: ', err);
        return;
    }
};
const timeToMillisecond = (time: string) => {
    const number = +time.substring(0, time.indexOf(' '));
    switch (time.substr(time.indexOf(' ') + 1)) {
        case 'day':
            return number * 24 * 60 * 60 * 1000;
        case 'hour':
            return number * 60 * 60 * 1000;
        case 'minute':
            return number * 60 * 1000;
        case 'second':
            return number * 1000;
        default:
            return number * 60 * 1000;
    }
};
export const checkCookie = (cname: string) => {
    const cookieInfo = getCookie(cname);
    return !!cookieInfo;
};
export const getCookieLogin = (cname: string) => {
    const name = cname + '=';
    const ca = document?.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            let str = c.substring(name.length, c.length).replace(/\s/g, '');
            return decodeURIComponent(escape(window.atob(str)));
        }
    }
    return '';
};
export const getCookieWithoutEncode = (cname: string) => {
    try {
        const name = cname + '=';
        const ca = document?.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
    } catch (err) {
        console.log('Error: ', err);
        return '';
    }
};
export const setCookieWithoutEncode = (cname: string, cValue: string, exTime: string) => {
    const d = new Date();
    d.setTime(d.getTime() + timeToMillisecond(exTime));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cValue + ';' + expires + ';path=/';
};

export const cookieName = {
    settingTab: 'settingTab',
};

/* helper */
const updateSettingTab = (tab: any) => {
    setCookieWithoutEncode(cookieName.settingTab, tab, '1 hour');
};
const getSettingTab = () => {
    return getCookieWithoutEncode(cookieName.settingTab);
};

const deleteLoginCookies = (names = []) => {
    const expires = 'expires=-1';
    // document.cookie = process.env.REACT_APP_ACCESS_TOKEN + '=' + '' + ';' + expires + ';path=/';
    let d = new Date();
    d.setDate(d.getDate() - 1);
    document.cookie = process.env.REACT_APP_ACCESS_TOKEN + `=; expires=${d}; path=/;`;
};

export { getSettingTab, updateSettingTab, deleteLoginCookies };
