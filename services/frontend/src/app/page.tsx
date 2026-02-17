import Surface from "@/components/ui/Surface";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <Surface className="mx-auto px-8 py-40 text-text-primary bg-background-secondary">
      <div className="flex flex-col gap-10">
        <h1 className="text-6xl text-center font-semibold">
          I build secure, production-grade systems from the ground up.
        </h1>
        <p className="text-text-primary text-center font-medium text-lg">
          Containerized services. Reverse proxies. Edge routing.
          <br />
          Every system is built to be reproducible, secure, and understandable.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-accent-primary text-white">
            View Projects
          </Button>
          <Button className="border-accent-primary border-2 text-accent-primary">
            Explore Architecture
          </Button>
        </div>
      </div>
    </Surface>
  );
}
