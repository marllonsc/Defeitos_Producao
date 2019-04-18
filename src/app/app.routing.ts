import { DataTableDefectsComponent } from './data-table-defects/data-table-defects.component';
import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'defeitos',
        pathMatch: 'full',
    },
    {
        path: 'defeitos',
        component: DataTableDefectsComponent
    },
]
