import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface IBreadcrumbItem {
    title: string;
    href?: string;
}
export default function BreadcrumbNavigator({ items }: { items: IBreadcrumbItem[] }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < items.length - 1 && (
                                <BreadcrumbSeparator />
                            )}
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )

}