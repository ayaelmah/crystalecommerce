import React from "react";
import Link from "next/link";
import styles from "./dashboard.module.css"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav className={styles.navbar}>
                <ul>
                    <li>
                        <Link href="/dashboard/statistics">
                            Statistics
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/users">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/products">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/categories">
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/orders">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/coupons">
                            Coupons
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    );
}