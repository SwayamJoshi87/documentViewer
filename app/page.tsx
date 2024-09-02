import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircleUser,
  HomeIcon,
  Menu,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/togglebutton";

import Image from "next/image";

const users = [
  {
    user: "John Doe",
    comments: 15,
    tags: 7,
  },
  {
    user: "Jane Smith",
    comments: 23,
    tags: 12,
  },
  {
    user: "Bob Johnson",
    comments: 8,
    tags: 3,
  },
  {
    user: "Alice Brown",
    comments: 31,
    tags: 18,
  },
  {
    user: "Charlie Wilson",
    comments: 19,
    tags: 9,
  },
];

const comments = [
  {
    date: "8/23",
    time: "11:14",
    user: "Melanie Q",
    doc: "F2.A.2",
    comment: "I think that...",
  },
  {
    date: "8/23",
    time: "08:13",
    user: "John G",
    doc: "F3.A.1",
    comment: "What he is...",
  },
  {
    date: "8/21",
    time: "17:08",
    user: "Melanie Q",
    doc: "F2.B",
    comment: "I disagree...",
  },
];


export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <HomeIcon className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/data"
            className="text-foreground transition-colors hover:text-foreground"
          >
            postgreSQL
          </Link>
          <Link
            href="/api/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            API
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <HomeIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-foreground">
                Home
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
            <ModeToggle />
        
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Number of Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">500</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Percentage With Comments
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2%</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-2">
          <Card x-chunk="dashboard-01-chunk" className="col-span-1 relative">
            <div className="p-4">
              <Image
                width={250}
                height={500}
                src="https://picsum.photos/450/500?greyscale"
                alt="Image"
                className="rounded-md object-cover pr-4 pb-4 float-left"
              />
              <p className="font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                omnis veritatis voluptates quae fuga, provident maiores quia rem
                aliquam. Nam ducimus cupiditate dolores temporibus reprehenderit
                amet quidem culpa incidunt odio. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Quia quas commodi aperiam atque
                doloribus aliquam velit dicta dignissimos deserunt magni,
                veritatis quos eius dolores nesciunt recusandae? Vitae vel alias
                sed! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloremque, et obcaecati ut distinctio expedita natus nostrum
                enim similique dignissimos modi, culpa reprehenderit nesciunt
                quo. Obcaecati voluptatum placeat assumenda quis veritatis.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestias sint saepe ea accusantium, nisi doloribus. Esse quo
                animi temporibus quisquam aut labore placeat, illo velit vitae
                eligendi maxime nam architecto. Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Maiores aperiam voluptates
                voluptatem exercitationem qui tempore non odit autem, ducimus
                voluptate, quia similique enim tenetur facilis veritatis iusto
                impedit consectetur repellendus? Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Ut dignissimos necessitatibus
                accusamus dolores, praesentium, facilis obcaecati vero delectus,
                odit provident assumenda veniam earum mollitia! Cumque sed
                molestias cum molestiae consectetur. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. At voluptas ipsum in totam magnam
                eum porro ipsa, odit maiores dolorum. Animi repellat deserunt
                quae reiciendis quas! Praesentium, perferendis optio? Quam.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                asperiores commodi provident dignissimos tempore illum excepturi
                rem nisi recusandae. Corporis atque vel perspiciatis vero maxime
                illum eum deleniti saepe ratione. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Eveniet tenetur doloribus aperiam
                sunt nihil asperiores corrupti quasi cupiditate iusto optio,
                illum illo numquam sed incidunt voluptate, sint ex quod
                deleniti? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Sequi quaerat consectetur, possimus enim labore magni
                voluptatem dolorem atque suscipit modi ullam omnis in deserunt
                fuga maiores repellat laudantium dignissimos aliquam. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                incidunt labore odio, architecto aperiam recusandae facere,
                maxime fuga repellat ab mollitia aspernatur repellendus maiores
                modi minima fugit doloremque dolore assumenda? Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Enim autem quasi
                officiis optio deleniti itaque! Harum praesentium natus
                voluptates, consequatur in at? Perferendis suscipit
                necessitatibus voluptatum facere, porro odit vel.
              </p>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Button asChild size="lg" className="">
                <Link href="#">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
          <div className="flex flex-col gap-4 md:gap-8">
            <Card className="col-span-1" x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Most Active Users</CardTitle>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>User activity summary</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">User</TableHead>
                      <TableHead className="w-[20%] text-right">
                        Comments
                      </TableHead>
                      <TableHead className="w-[40%] text-right">Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.user}>
                        <TableCell className="w-[40%] font-medium">
                          {user.user}
                        </TableCell>
                        <TableCell className="w-[20%] text-right">
                          {user.comments}
                        </TableCell>
                        <TableCell className="w-[40%] text-right">
                          {user.tags}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-1" x-chunk="dashboard-01-chunk-2">
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <Table>
                  <TableCaption>Recent Comments</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Doc</TableHead>
                      <TableHead className="w-[20%]">Comment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comments.map((comment, index) => (
                      <TableRow key={index}>
                        <TableCell>{comment.date}</TableCell>
                        <TableCell>{comment.time}</TableCell>
                        <TableCell>{comment.user}</TableCell>
                        <TableCell>{comment.doc}</TableCell>
                        <TableCell className="w-[20%] ">{comment.comment}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
