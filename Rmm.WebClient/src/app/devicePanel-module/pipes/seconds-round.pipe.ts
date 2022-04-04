import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondsRound'
})
export class SecondsRoundPipe implements PipeTransform {

    public transform(value: number, range: number): string {
        return value < range ? 'Right now' : `Last answer ${Math.round(value / range) * range} seconds ago`;
    }

}
