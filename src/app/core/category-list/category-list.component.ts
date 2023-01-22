import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { CategoryDictionaries } from '../../dashboard-trips/interfaces/category-dictionaries';

@Component({
  selector: 'tp-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  _categories: CategoryDictionaries[] = [];

  convertedIcons: string[] = [];
  @Input()
  set categories(val: CategoryDictionaries[]) {
    this._categories = val;
    this.categoriesToIcons();
  }

  categoryIconBindingMap: Map<string[], string> = new Map([
    [
      [
        'food',
        'meal_takeaway',
        'meal_delivery',
        'cafe',
        'bar',
        'bakery',
        'restaurant',
      ],
      'restaurant',
    ],
    [['spa', 'gym', 'beauty_salon'], 'local_hospital'],
    [
      [
        'zoo',
        'tourist_attraction',
        'stadium',
        'rv_park',
        'library',
        'city_hall',
        'church',
        'cemetery',
        'campground',
        'bowling_alley',
        'aquarium',
        'amusement_park',
        'museum',
        'art_gallery',
      ],
      'fort',
    ],
    [
      [
        'shoe_store',
        'store',
        'liquor_store',
        'jewelry_store',
        'hardware_store',
        'furniture_store',
        'electronics_store',
        'department_store',
        'convenience_store',
        'book_store',
      ],
      'local_grocery_store',
    ],
    [['night_club', 'casino'], 'nightlife'],
  ]);

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {}

  categoriesToIcons() {
    const res = new Set<string>();
    this._categories.forEach((elem) => {
      let icon = this.icon(elem.name);
      if (icon !== null) {
        res.add(icon);
      }
    });
    this.convertedIcons = Array.from(res);
    this.changeDetectorRef.detectChanges();
  }
  icon(val: string): string | null {
    for (let entry of this.categoryIconBindingMap.entries()) {
      if (entry[0].find((cat) => cat == val)) {
        return entry[1];
      }
    }
    return null;
  }
}
