/**
 * Password validator for login pages
 */
import value from '@/assets/scss/_themes-vars.module.scss';
// has number
const hasNumber = (str) => new RegExp(/[0-9]/).test(str);
// has mix of small and capitals
const hasMixed = (str) => new RegExp(/[a-z]/).test(str) && new RegExp(/[A-Z]/).test(str);
// has special chars
const hasSpecial = (str) => new RegExp(/[!#@$%^&*)(+=._-]/).test(str);
// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2)
        return {
            label: 'Poor',
            color: value.errorMain,
        };
    if (count < 3)
        return {
            label: 'Weak',
            color: value.warningDark,
        };
    if (count < 4)
        return {
            label: 'Normal',
            color: value.orangeMain,
        };
    if (count < 5)
        return {
            label: 'Good',
            color: value.successMain,
        };
    if (count < 6)
        return {
            label: 'Strong',
            color: value.successDark,
        };
    return {
        label: 'Poor',
        color: value.errorMain,
    };
};
// password strength indicator
export const strengthIndicator = (str) => {
    let strengths = 0;
    if (str.length > 5)
        strengths += 1;
    if (str.length > 7)
        strengths += 1;
    if (hasNumber(str))
        strengths += 1;
    if (hasSpecial(str))
        strengths += 1;
    if (hasMixed(str))
        strengths += 1;
    return strengths;
};
