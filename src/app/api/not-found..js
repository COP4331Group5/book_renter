export default function NotFound() {
    return Response.json("Route not found", { status: 404 });
}
