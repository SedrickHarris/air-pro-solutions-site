# URL migration map (old -> new)

Generated 2026-10-14 from the built `out/` tree (113 pages) before any source change. No redirects are created (site is not live, temporary domain).

## Locked rules

- Service: `/<service>/` -> `/services/<service>/`
- Service + city: `/<service>/<city>-ca/` -> `/services/<service>/<city>/`
- City: `/service-areas/<city>-ca/` -> `/service-areas/<city>/`
- Unchanged: `/`, `/residential-hvac/`, `/commercial-hvac/`, `/faq/`, `/careers/`, `/blog/`, `/service-areas/`, `/services/`, region hubs, core pages, `/commercial-hvac/<slug>/`.
- Reserved top-level slugs: `services`, `service-areas`, `residential-hvac`, `commercial-hvac`, `resources`, `faq`, `careers`, `blog`

## Collision checks (Step 1)

- City slugs after dropping `-ca`: 32 cities, duplicates: **none**
- City slug equals a region slug (`inland-empire`, `los-angeles-county`, `orange-county`, `south-bay`): **none**
- City slug equals a reserved slug: **none**
- Service slugs that equal a reserved slug: **none**
- Unmapped URLs: **none**

### Needs a decision, resolved as follows

`emergency-hvac` is a service in `src/content/services.ts`. In the first migration pass it was kept at `/emergency-hvac/` (reserved slug). **Superseded:** it was then moved to `/services/emergency-hvac/` like every other service, and removed from the reserved list. The map below includes that move.

## Map

| Old URL | New URL | Type | Indexable |
|---|---|---|---|
| `/ac-installation/` | `/services/ac-installation/` | Service | Yes |
| `/ac-maintenance/` | `/services/ac-maintenance/` | Service | Yes |
| `/ac-repair/` | `/services/ac-repair/` | Service | Yes |
| `/ac-repair/torrance-ca/` | `/services/ac-repair/torrance/` | Service + city | Yes |
| `/ac-replacement/` | `/services/ac-replacement/` | Service | No (stub) |
| `/air-filtration-systems/` | `/services/air-filtration-systems/` | Service | No (stub) |
| `/air-purifier-installation/` | `/services/air-purifier-installation/` | Service | No (stub) |
| `/duct-installation/` | `/services/duct-installation/` | Service | No (stub) |
| `/duct-repair/` | `/services/duct-repair/` | Service | No (stub) |
| `/duct-replacement/` | `/services/duct-replacement/` | Service | No (stub) |
| `/duct-sealing/` | `/services/duct-sealing/` | Service | No (stub) |
| `/ductless-mini-split-installation/` | `/services/ductless-mini-split-installation/` | Service | No (stub) |
| `/ductless-mini-split-maintenance/` | `/services/ductless-mini-split-maintenance/` | Service | No (stub) |
| `/ductless-mini-split-repair/` | `/services/ductless-mini-split-repair/` | Service | No (stub) |
| `/ductless-mini-split-replacement/` | `/services/ductless-mini-split-replacement/` | Service | No (stub) |
| `/emergency-hvac/` | `/services/emergency-hvac/` | Service | Yes |
| `/ductless-mini-split/` | `/services/ductless-mini-split/` | Service | Yes |
| `/ductwork-services/` | `/services/ductwork-services/` | Service | No (stub) |
| `/ductwork/` | `/services/ductwork/` | Service | Yes |
| `/furnace-installation/` | `/services/furnace-installation/` | Service | Yes |
| `/furnace-repair/` | `/services/furnace-repair/` | Service | No (stub) |
| `/furnace-replacement/` | `/services/furnace-replacement/` | Service | No (stub) |
| `/heat-pump-installation/` | `/services/heat-pump-installation/` | Service | No (stub) |
| `/heat-pump-maintenance/` | `/services/heat-pump-maintenance/` | Service | No (stub) |
| `/heat-pump-repair/` | `/services/heat-pump-repair/` | Service | No (stub) |
| `/heat-pump-replacement/` | `/services/heat-pump-replacement/` | Service | No (stub) |
| `/heat-pump-services/` | `/services/heat-pump-services/` | Service | Yes |
| `/heating-installation/` | `/services/heating-installation/` | Service | No (stub) |
| `/heating-maintenance/` | `/services/heating-maintenance/` | Service | No (stub) |
| `/heating-repair/` | `/services/heating-repair/` | Service | Yes |
| `/hvac-installation/` | `/services/hvac-installation/` | Service | No (stub) |
| `/hvac-maintenance/` | `/services/hvac-maintenance/` | Service | No (stub) |
| `/hvac-repair/` | `/services/hvac-repair/` | Service | No (stub) |
| `/hvac-replacement/` | `/services/hvac-replacement/` | Service | No (stub) |
| `/indoor-air-quality/` | `/services/indoor-air-quality/` | Service | Yes |
| `/maintenance-plans/` | `/services/maintenance-plans/` | Service | No (stub) |
| `/service-areas/anaheim-ca/` | `/service-areas/anaheim/` | City | No (stub) |
| `/service-areas/burbank-ca/` | `/service-areas/burbank/` | City | No (stub) |
| `/service-areas/carson-ca/` | `/service-areas/carson/` | City | No (stub) |
| `/service-areas/chino-ca/` | `/service-areas/chino/` | City | No (stub) |
| `/service-areas/corona-ca/` | `/service-areas/corona/` | City | No (stub) |
| `/service-areas/costa-mesa-ca/` | `/service-areas/costa-mesa/` | City | No (stub) |
| `/service-areas/culver-city-ca/` | `/service-areas/culver-city/` | City | No (stub) |
| `/service-areas/eastvale-ca/` | `/service-areas/eastvale/` | City | No (stub) |
| `/service-areas/el-segundo-ca/` | `/service-areas/el-segundo/` | City | No (stub) |
| `/service-areas/fontana-ca/` | `/service-areas/fontana/` | City | No (stub) |
| `/service-areas/fullerton-ca/` | `/service-areas/fullerton/` | City | No (stub) |
| `/service-areas/gardena-ca/` | `/service-areas/gardena/` | City | No (stub) |
| `/service-areas/glendale-ca/` | `/service-areas/glendale/` | City | No (stub) |
| `/service-areas/hawthorne-ca/` | `/service-areas/hawthorne/` | City | No (stub) |
| `/service-areas/hermosa-beach-ca/` | `/service-areas/hermosa-beach/` | City | No (stub) |
| `/service-areas/huntington-beach-ca/` | `/service-areas/huntington-beach/` | City | No (stub) |
| `/service-areas/inglewood-ca/` | `/service-areas/inglewood/` | City | No (stub) |
| `/service-areas/irvine-ca/` | `/service-areas/irvine/` | City | No (stub) |
| `/service-areas/long-beach-ca/` | `/service-areas/long-beach/` | City | No (stub) |
| `/service-areas/los-angeles-ca/` | `/service-areas/los-angeles/` | City | No (stub) |
| `/service-areas/manhattan-beach-ca/` | `/service-areas/manhattan-beach/` | City | No (stub) |
| `/service-areas/newport-beach-ca/` | `/service-areas/newport-beach/` | City | No (stub) |
| `/service-areas/ontario-ca/` | `/service-areas/ontario/` | City | No (stub) |
| `/service-areas/pasadena-ca/` | `/service-areas/pasadena/` | City | No (stub) |
| `/service-areas/rancho-cucamonga-ca/` | `/service-areas/rancho-cucamonga/` | City | No (stub) |
| `/service-areas/redondo-beach-ca/` | `/service-areas/redondo-beach/` | City | No (stub) |
| `/service-areas/riverside-ca/` | `/service-areas/riverside/` | City | No (stub) |
| `/service-areas/santa-ana-ca/` | `/service-areas/santa-ana/` | City | No (stub) |
| `/service-areas/santa-monica-ca/` | `/service-areas/santa-monica/` | City | No (stub) |
| `/service-areas/torrance-ca/` | `/service-areas/torrance/` | City | Yes |
| `/service-areas/tustin-ca/` | `/service-areas/tustin/` | City | No (stub) |
| `/service-areas/upland-ca/` | `/service-areas/upland/` | City | No (stub) |
| `/ventilation-services/` | `/services/ventilation-services/` | Service | No (stub) |
| `/whole-home-air-purification/` | `/services/whole-home-air-purification/` | Service | No (stub) |

## Totals

- Services moved: 37 (emergency-hvac included)
- Service + city moved: 1
- City pages moved: 32
