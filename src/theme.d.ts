import { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        body1medium?: React.CSSProperties;
        body1SemiBold?: React.CSSProperties;
        body2Semibold?: React.CSSProperties;
        body2medium?: React.CSSProperties;
        buttonMedium?: React.CSSProperties;
        avatarLetter?: React.CSSProperties;
        inputLevel?: React.CSSProperties;
        helperText?: React.CSSProperties;
        chipLight?: React.CSSProperties;
        inputText?: React.CSSProperties;
        tooltip?: React.CSSProperties;
        badge?: React.CSSProperties;
        chipMedium?: React.CSSProperties;
        TableHeader?: React.CSSProperties;
        alert?: React.CSSProperties;
        helperText2?: React.CSSProperties;
    }

    interface Palette {
        other: {
            outlinedEnabledBorder: string;
            outlinedBorderDarker: string;
            outlinedBorder: string;
        };
    }

    // interface PaletteOptions {
    //     other: {
    //         [key: string]: string;
    //     };
    // }
}

declare module '@mui/material/Chip' {
    interface ChipPropsSizeOverrides {
        xSmall: true;
    }
}
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxl: true;
        xs:true;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        body1medium: true;
        body1SemiBold: true;
        body2Semibold: true;
        body2medium: true;
        buttonMedium: true;
        avatarLetter: true;
        inputLevel: true;
        helperText: true;
        chipLight: true;
        inputText: true;
        tooltip: true;
        badge: true;
        chipMedium: true;
        TableHeader: true;
        alert: true;
        helperText2: true;
    }
}
