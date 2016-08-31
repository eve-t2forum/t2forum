import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    DECLARATIONS as LOGO_DECLARATIONS,
} from './logo';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ...LOGO_DECLARATIONS,
    ],
    exports: [
        ...LOGO_DECLARATIONS,
    ]
})
export class SampleModule {}
