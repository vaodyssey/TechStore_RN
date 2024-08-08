import { PriceRange } from "../entities/PriceRange"
import { SortOptions, SortOrder } from "../entities/SortOptions"

export const SAMPLE_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in neque quis lacus dapibus venenatis. Donec varius, orci at maximus auctor, purus est sollicitudin felis, non aliquam magna sem vitae quam. Vestibulum iaculis vulputate pretium. Sed sed metus leo. Maecenas sed lectus in mauris convallis molestie. Nulla facilisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras felis orci, rutrum et urna sed, fringilla maximus augue. Pellentesque quam ex, dictum quis est nec, cursus lobortis nulla. Cras fringilla, enim viverra consectetur suscipit, ipsum dolor mollis orci, id facilisis tellus mauris eu velit. Pellentesque posuere urna sapien. Duis eget varius enim, et posuere sem. Phasellus facilisis leo eget ex venenatis viverra.

Aenean dignissim, nunc non luctus tempus, erat orci egestas purus, sed lobortis tellus dolor et ex. Curabitur scelerisque dui id ipsum feugiat, sed cursus sem tempus. Cras tincidunt tempus dictum. Aliquam dictum est a nisl tempus, at ornare nulla sodales. Ut id iaculis diam. Phasellus placerat interdum tortor quis faucibus. Cras luctus consequat elementum.

Praesent eu porta sem. Vestibulum cursus, neque vitae molestie mollis, nulla sapien facilisis odio, quis pellentesque massa erat nec lacus. Sed mollis porta risus eu rutrum. Etiam ultrices scelerisque ultricies. Nunc hendrerit ac nisi vitae rutrum. Donec vitae nisl massa. Integer molestie odio eget orci congue, quis porttitor leo finibus. Etiam quis mollis felis. Fusce pretium purus id finibus varius. Nam ac feugiat quam. Curabitur eleifend eleifend mollis. Vestibulum ornare elit sit amet sapien eleifend, a sodales nulla tincidunt. Sed quis ultricies sem.

Proin rhoncus ipsum ut metus hendrerit, non lobortis felis dictum. Donec vel molestie tellus, eu faucibus urna. Suspendisse facilisis sagittis nisi, non iaculis arcu pretium eu. Etiam sollicitudin tincidunt dictum. Nulla facilisi. Vestibulum at neque sed ipsum auctor semper. Suspendisse id congue eros.

Nulla fermentum vitae dui id ullamcorper. Morbi tristique venenatis velit nec convallis. Praesent porttitor, sem sed feugiat fringilla, augue arcu rutrum nisl, ut porta nisi sem id quam. Praesent ac libero semper, vestibulum enim at, vulputate odio. Aliquam elit velit, pretium sit amet libero ac, posuere volutpat magna. Nulla nec gravida dolor. Aliquam convallis ligula vitae metus tincidunt rhoncus.`

export const PRICE_RANGES: PriceRange[] = [
    {
        label: 'From 10.000.000 VND to 20.000.000 VND',
        rangeInt: [10000000, 20000000]
    },
    {
        label: 'From 20.000.000 VND to 40.000.000 VND',
        rangeInt: [20000000, 40000000]
    },
    {
        label: 'From 40.000.000 VND to 80.000.000 VND',
        rangeInt: [40000000, 80000000]
    },
    {
        label: 'Over 80.000.000 VND',
        rangeInt: [80000000, 999999999]
    },
]

export const SORT_OPTIONS: SortOptions[] = [{
    icon: 'cash',
    name: 'Price',
    value: 'price'
},
{
    icon: 'information-variant',
    name: 'Name',
    value: 'name'
}]
export const SORT_ORDERS: SortOrder[] = [{
    icon: 'arrow-up-right',
    name: 'Ascending',
    value: 'asc'
},
{
    icon: 'arrow-down-left',
    name: 'Descending',
    value: 'desc'
}
]