# SKYBRIDGE — Orbital Transportation Infrastructure

> **Status: long-term research & engineering program, concept stage.** SKYBRIDGE is a
> vision and a research agenda, not an operational system or a completed design. This
> charter describes *intent, architecture direction, and open questions* — and is explicit
> about what has **not** been decided. We describe honestly what is a concept, a study,
> and a result. No built hardware or validated performance is claimed here.

## Mission

**SKYBRIDGE is ELION's long-term vision for an interoperable orbital transportation
infrastructure that enables reusable, safe, autonomous, and increasingly accessible
movement through space.**

## The core idea

Today, a spacecraft is usually a mission-specific object: launch → orbit → mission →
disposal. SKYBRIDGE asks a different question:

> How do we make movement through Earth orbit more like *transportation infrastructure*
> and less like a sequence of isolated, disposable missions?

The mental model is the same leap humanity made on Earth: roads enable vehicles, airports
enable aircraft, ports enable ships. SKYBRIDGE aims toward the orbital equivalent of that
*infrastructure layer* — not literally an "orbital road" (the physics and economics are
entirely different), but a system that lets many spacecraft move, interact, be serviced,
and operate as part of an ecosystem. **SKYBRIDGE is therefore a system of systems, not a
single spacecraft.**

```
                         SKYBRIDGE  (orbital transport system)
        ┌─────────────────────────┼─────────────────────────┐
   ACCESS LAYER               ORBITAL LAYER             OPERATIONS LAYER
   Earth → orbit              transfer / staging        traffic management
   launch integration         depots / servicing        navigation
   recovery                   docking                    autonomy
        └─────────────────────────┼─────────────────────────┘
                            VEHICLE ECOSYSTEM
                    ┌────────────┼────────────┐
                  LOVE       cargo vehicles   future vehicles
```

## The hard problems SKYBRIDGE explores

A serious program eventually has to address, among others:

- **Orbital transportation** — efficiently changing a spacecraft's orbital state (raising,
  lowering, plane change, phasing, rendezvous, controlled return). This is closer to
  *orbital logistics* than single-mission aerospace: an optimization across trajectory,
  propellant, time, thermal limits, safety, and vehicle availability.
- **Autonomous rendezvous & docking** — navigation → relative-state estimation → guidance
  → approach → collision avoidance → docking, with fault detection and safe aborts.
  (A natural home for spacecraft GNC contributors.)
- **Propellant, energy & servicing infrastructure** — moving from "every vehicle launches
  with everything it will ever need" toward "spacecraft can interact with infrastructure"
  (refueling, servicing, inspection, life-extension). The *mechanism* is undecided; the
  goal is to make spacecraft less isolated.
- **Standardized interfaces** — docking, mechanical, power, data, navigation, safety.
  Standardization is what turns a program into infrastructure.
- **Mission & traffic intelligence (software-defined)** — scheduling, slot allocation,
  transfer planning, conjunction/collision avoidance, logistics, sequencing. SKYBRIDGE
  should ultimately understand the state of the *network*, not just one spacecraft — where
  ELION's future intelligence layer becomes powerful.
- **Autonomy with humans in the loop** — machines handle predictable complexity so humans
  focus on high-consequence judgment. The goal is *not* "AI flies everything."
- **Safety & verification** — fault tolerance, redundancy, safe modes, abort trajectories,
  FDIR, conjunction assessment, controlled disposal, command authentication, independent
  verification. Because aerospace is inherently dual-use, verification and peaceful-use
  safety are among the hardest and most important parts of the whole effort.

## Relationship to LOVE

**SKYBRIDGE = network. LOVE = node.** SKYBRIDGE provides the transportation ecosystem;
LOVE is one class of vehicle that operates natively within it. Future ELION vehicles
(cargo, robotic servicing, science platforms) would interoperate with the same
infrastructure. See [LOVE.md](LOVE.md).

## What is NOT yet decided (and won't be invented to sound impressive)

None of the following is locked — each should emerge from real systems-engineering study,
not marketing: launch architecture, propulsion, vehicle dimensions, propellant, orbital
altitudes, delta-v budgets, docking standard, flight-software architecture, manufacturing,
cost targets, or operational model. If you see a number or a design claim about SKYBRIDGE
anywhere that *isn't* backed by a study in this repo, treat it as a bug and flag it.

## How you can help

SKYBRIDGE is at **Phase A** (mission architecture). The most valuable work now is
*understanding and defining*, not premature detailed design:

- **Learning & building** → research syntheses and literature reviews (`good first issue`).
- **A real challenge** → trade studies, requirement definition, interface concepts.
- **Advising / leading** → own a sub-area (e.g. rendezvous & docking, standardized
  interfaces, traffic intelligence), define its requirements and open questions, mentor.

Significant requirements get stable IDs (`SKY-…`) and decisions are recorded as ADRs, so
the reasoning is traceable and feeds ELION's future knowledge and verification layers.

## Development phases (indicative, evidence-gated)

- **A — Mission architecture:** transportation problem, use cases, mission classes,
  infrastructure requirements, interfaces, safety objectives.
- **B — System architecture:** transportation concepts, vehicle classes, rendezvous/docking
  architecture, logistics model.
- **C — GNC & autonomy:** transfer algorithms, navigation, guidance, control, collision
  avoidance, autonomy.
- **D — Infrastructure prototypes:** simulations, ground demonstrators, docking prototypes,
  software infrastructure, hardware-in-the-loop.
- **E — Flight demonstration:** only when the engineering evidence warrants it.

*The aspiration is to build technologies and infrastructure that progressively reduce the
barriers preventing humanity from benefiting from space — a defensible long-term objective,
not a promise of cheap orbital access tomorrow.*
