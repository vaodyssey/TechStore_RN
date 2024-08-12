import { DARK_GREEN, DARK_RED, GOLD } from "./colors"

export type DashboardItemData = {
    iconColor: string,
    icon: string,
    optionName: string
    destinationScreen: string

}

export const DASHBOARD_ITEMS: DashboardItemData[] = [
    { iconColor: DARK_GREEN, icon: 'account', optionName: 'Update your profile', destinationScreen: 'updateProfile' },
    { iconColor: GOLD, icon: 'cart-outline', optionName: 'Your orders', destinationScreen: 'orders' },
    { iconColor: DARK_RED, icon: 'lock-reset', optionName: 'Change your password', destinationScreen: '' },
]