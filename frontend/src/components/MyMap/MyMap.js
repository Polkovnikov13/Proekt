import React, { useEffect, useState } from 'react';
import style from './style.css';
import districtByIso from './Subjects';

export default function MyMap() {
  const [myMap, setMyMap] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      // eslint-disable-next-line no-undef
      const map = new ymaps.Map('map', {
        center: [65, 100],
        zoom: 3,
        type: null,
        controls: ['zoomControl'],
      }, {

        // restrictMapArea: [[10, 10], [85, -100]],
      });
      map.controls.get('zoomControl').options.set({ size: 'small' });
      // Добавим заливку цветом.
      // eslint-disable-next-line no-undef
      const pane = new ymaps.pane.StaticPane(map, {
        zIndex: 100,
        css: {
          width: '100%', height: '100%', backgroundColor: 'white',
        },
      });
      map.panes.append('white', pane);
      // Зададим цвета федеральных округов.
      const districtColors = {
        cfo: '#ffff6f',
        szfo: '#54cbba',
        yfo: '#f9768e',
        skfo: '#9a5597',
        pfo: '#30cb05',
        urfo: '#bac1cc',
        sfo: '#16acdb',
        dfo: '#fbc520',
      };
      // Зададим подсказки при наведении на федеральный округ.
      const districtsHints = {
        cfo: 'ЦФО',
        szfo: 'СЗФО',
        yfo: 'ЮФО',
        skfo: 'СКФО',
        pfo: 'ПФО',
        urfo: 'УрФО',
        sfo: 'СФО',
        dfo: 'ДФО',
      };
      // Создадим балун.
      // eslint-disable-next-line no-undef
      const districtBalloon = new ymaps.Balloon(map);
      districtBalloon.options.setParent(map.options);
      // Загрузим регионы.
      // eslint-disable-next-line no-undef
      ymaps.borders.load('RU', {
        lang: 'ru',
        quality: 2,
      }).then((result) => {
        // Создадим объект, в котором будут храниться коллекции с нашими регионами.
        const districtCollections = {};
        // Для каждого федерального округа создадим коллекцию.
        for (const district in districtColors) {
          // eslint-disable-next-line no-undef
          districtCollections[district] = new ymaps.GeoObjectCollection(null, {
            fillColor: districtColors[district],
            strokeColor: districtColors[district],
            strokeOpacity: 0.3,
            fillOpacity: 0.3,
            hintCloseTimeout: 0,
            hintOpenTimeout: 0,
          });
          // Создадим свойство в коллекции, которое позже наполним названиями субъектов РФ.
          districtCollections[district].properties.districts = [];
        }
        result.features.forEach((feature) => {
          const iso = feature.properties.iso3166;
          const { name } = feature.properties;
          const district = districtByIso[iso];
          // eslint-disable-next-line max-len
          // Для каждого субъекта РФ зададим подсказку с названием федерального округа, которому он принадлежит.
          // eslint-disable-next-line no-param-reassign
          feature.properties.hintContent = districtsHints[district];
          // Добавим субъект РФ в соответствующую коллекцию.
          // eslint-disable-next-line no-undef
          districtCollections[district].add(new ymaps.GeoObject(feature));
          // Добавим имя субъекта РФ в массив.
          districtCollections[district].properties.districts.push(name);
        });
        // eslint-disable-next-line max-len
        // Создадим переменную, в которую будем сохранять выделенный в данный момент федеральный округ.
        let highlightedDistrict;
        for (const districtName in districtCollections) {
          // Добавим коллекцию на карту.
          map.geoObjects.add(districtCollections[districtName]);
          // При наведении курсора мыши будем выделять федеральный округ.
          districtCollections[districtName].events.add('mouseenter', (event) => {
            const district = event.get('target').getParent();
            district.options.set({ fillOpacity: 1 });
          });
          // При выводе курсора за пределы объекта вернем опции по умолчанию.
          districtCollections[districtName].events.add('mouseleave', (event) => {
            const district = event.get('target').getParent();
            if (district !== highlightedDistrict) {
              district.options.set({ fillOpacity: 0.3 });
            }
          });
          // Подпишемся на событие клика.
          districtCollections[districtName].events.add('click', (event) => {
            const target = event.get('target');
            const district = target.getParent();
            // Если на карте выделен федеральный округ, то мы снимаем с него выделение.
            if (highlightedDistrict) {
              highlightedDistrict.options.set({ fillOpacity: 0.3 });
            }
            // eslint-disable-next-line max-len
            // Откроем балун в точке клика. В балуне будут перечислены регионы того федерального округа,
            // по которому кликнул пользователь.
            districtBalloon.open(event.get('coords'), district.properties.districts.join('<br>'));
            // Выделим федеральный округ.
            district.options.set({ fillOpacity: 1 });
            // Сохраним ссылку на выделенный федеральный округ.
            highlightedDistrict = district;
          });
        }
      });
      setMyMap(map);
    });
  }, []);
  return (
    <div
      id="map"
      className="map"
    />
  );
}
