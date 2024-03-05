import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzIconModule} from "ng-zorro-antd/icon";
import {IconDefinition} from '@ant-design/icons-angular';
import {StepBackwardOutline, CaretLeftOutline, SettingOutline} from '@ant-design/icons-angular/icons';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPipesModule} from "ng-zorro-antd/pipes";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzCarouselModule} from 'ng-zorro-antd/carousel';
import {NzAlertModule} from "ng-zorro-antd/alert";


const icons: IconDefinition[] = [
    StepBackwardOutline,
    CaretLeftOutline,
    SettingOutline,
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NzIconModule.forChild(icons)
    ],
    exports: [
        NzIconModule,
        NzTableModule,
        NzButtonModule,
        NzDividerModule,
        NzPipesModule,
        NzInputNumberModule,
        NzSpinModule,
        NzFormModule,
        NzSelectModule,
        NzDrawerModule,
        NzPaginationModule,
        NzCollapseModule,
        NzToolTipModule,
        NzTabsModule,
        NzInputModule,
        NzCheckboxModule,
        NzDatePickerModule,
        NzResultModule,
        NzAvatarModule,
        NzPopoverModule,
        NzCarouselModule,
        NzAlertModule
    ]
})
export class NgZorroModule {
}
