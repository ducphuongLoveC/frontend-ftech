import { SET_BORDER_RADIUS, SET_FONT_FAMILY, TOGGLE_THEME } from '@/store/actions';
import { gridSpacing } from '@/store/constant';
import { RootState } from '@/store/reducer';
import SubCard from '@/ui-component/cards/SubCard';
import {
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  Typography,
  useTheme,
  Slider,
} from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';

function valueText(value: number) {
  return `${value}px`;
}

interface DrawerSettingProps {
  open: boolean;
  onClose: () => void;
}
const DrawerSetting: React.FC<DrawerSettingProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state: RootState) => state.mainReducer);

  const handleBorderRadius = (_event: Event | SyntheticEvent, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch({
        type: SET_BORDER_RADIUS,
        borderRadius: newValue,
      });
    }
  };

  let initialFont: string;
  switch (customization.fontFamily) {
    case `'Inter', sans-serif`:
      initialFont = 'Inter';
      break;
    case `'Poppins', sans-serif`:
      initialFont = 'Poppins';
      break;
    case `'Roboto', sans-serif`:
    default:
      initialFont = 'Roboto';
      break;
  }

  const [fontFamily, setFontFamily] = useState<string>(initialFont);
  const handleFontFamilyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFont = e.target.value;
    setFontFamily(selectedFont);
    let newFont: string;
    switch (selectedFont) {
      case 'Inter':
        newFont = `'Inter', sans-serif`;
        break;
      case 'Poppins':
        newFont = `'Poppins', sans-serif`;
        break;
      case 'Roboto':
      default:
        newFont = `'Roboto', sans-serif`;
        break;
    }
    dispatch({
      type: SET_FONT_FAMILY,
      fontFamily: newFont,
    });
  };

  const handleToggleThemeMode = () => {

    console.log(customization.theme);
    
    const newTheme = customization.theme === 'light' ? 'dark' : 'light';
    dispatch({
      type: TOGGLE_THEME,
      theme: newTheme,
    });
  };

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: '50%',
        },
      }}
    >
      <PerfectScrollbar component="div">
        <Grid
          container
          spacing={gridSpacing}
          sx={{
            p: 3,
          }}
        >
          <Grid item xs={12}>
            {/* font family */}
            <SubCard title="Font Family">
              <FormControl>
                <RadioGroup
                  aria-label="font-family"
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Roboto"
                    control={<Radio />}
                    label="Roboto"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                      },
                      '& .MuiFormControlLabel-label': {
                        color: theme.palette.grey[900],
                      },
                    }}
                  />
                  <FormControlLabel
                    value="Poppins"
                    control={<Radio />}
                    label="Poppins"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                      },
                      '& .MuiFormControlLabel-label': {
                        color: theme.palette.grey[900],
                      },
                    }}
                  />
                  <FormControlLabel
                    value="Inter"
                    control={<Radio />}
                    label="Inter"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                      },
                      '& .MuiFormControlLabel-label': {
                        color: theme.palette.grey[900],
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            {/* border radius */}
            <SubCard title="Border Radius">
              <Grid
                item
                xs={12}
                container
                spacing={2}
                alignItems="center"
                sx={{
                  mt: 2.5,
                }}
              >
                <Grid item>
                  <Typography variant="h6" color="secondary">
                    4px
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Slider
                    size="small"
                    value={customization.borderRadius}
                    onChange={handleBorderRadius}
                    getAriaValueText={valueText}
                    valueLabelDisplay="on"
                    aria-labelledby="discrete-slider-small-steps"
                    marks
                    step={2}
                    min={4}
                    max={24}
                    color="secondary"
                    sx={{
                      '& .MuiSlider-valueLabel': {
                        color: 'secondary.light',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="secondary">
                    24px
                  </Typography>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          <Grid item xs={12}>
            {/* theme */}
            <SubCard title="Theme">
              <FormControl>
                <FormControlLabel
                  control={<Switch checked={customization.theme === 'dark'} onChange={handleToggleThemeMode} />}
                  label={customization.theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                />
              </FormControl>
            </SubCard>
          </Grid>
        </Grid>
      </PerfectScrollbar>
    </Drawer>
  );
};
export default DrawerSetting;