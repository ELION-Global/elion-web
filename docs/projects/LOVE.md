# LOVE — Long-Range Orbital Vehicle for Everyone

> **Status: long-term spacecraft concept, concept stage.** LOVE is a vehicle *vision and
> design philosophy*, not a built or fully designed spacecraft. This charter describes
> intent and open questions honestly; no capabilities, dimensions, or performance are
> claimed as decided.

## Mission

**LOVE — Long-Range Orbital Vehicle for Everyone — is ELION's long-term spacecraft vision:
a safe, reusable, adaptable orbital vehicle designed around human benefit, intended to
operate as a native part of the SKYBRIDGE transportation ecosystem.**

## The idea: a different philosophy of spacecraft design

LOVE is not "a spacecraft with a nice name." It's the vehicle-level expression of ELION's
humanitarian philosophy. Traditional spacecraft engineering often reduces a mission to
*payload mass + delta-v*. LOVE deliberately broadens the question to:

> What is the safest, most useful, most reusable, and most accessible way to perform the
> mission?

**"For Everyone" does not mean magically cheap spaceflight** — that would be an
unsupported claim. It means designing the vehicle and its surrounding system to *reduce
unnecessary barriers to participation and use*: accessibility, safety, reusability,
maintainability, and adaptability treated as first-class design goals, not afterthoughts.

## Directions the concept explores

- **Human-centered design** — where a mission involves people: accessible, ergonomic,
  fault-tolerant, clear human–machine interaction, meaningful (not total) automation.
- **Adaptability through modularity** — not locked into one narrow mission; a core vehicle
  potentially supporting research, cargo, and human-serving mission classes. *(Exact
  configuration undecided.)*
- **Long-duration capability** — "long-range" implies more than a short orbital capsule:
  power, thermal, radiation, comms, GNC, propulsion, avionics reliability, autonomy,
  maintenance, debris, and recovery all become real design problems.
- **Whole-life evaluation** — a sustainable vehicle is judged as *performance +
  reusability + maintainability + operability + safety + cost*, not performance alone.

## Native to SKYBRIDGE

This is the most important relationship in the program: **LOVE should not operate in
isolation — it should be a native SKYBRIDGE vehicle**, understanding and using the
infrastructure's navigation, docking, and logistics. That enables automatic rendezvous
scheduling, transfer planning, servicing, and mission updates instead of every mission
being a standalone event. See [SKYBRIDGE.md](SKYBRIDGE.md).

## Digital engineering from the start

A mature LOVE program should be **software-defined** and maintain a **digital twin** —
geometry, mass properties, thermal, propulsion, structures, GNC, power, environment, and
software configuration — so an engineering change propagates cleanly:

```
Requirement → Design → Simulation → Test → Verification → Vehicle configuration
```

This connects directly to ELION's future knowledge-graph and verification architecture:
structured requirements, ADRs, and explicit links between requirements, designs, tests,
and decisions, so hard-won engineering knowledge doesn't vanish into disconnected files.

## What is NOT yet decided

Not locked, and not to be invented for effect: mission duration, orbit classes, crew or
payload concept, propulsion, structures, thermal architecture, reusability targets, safety
requirements, or cost. These must come from real requirements and design studies.

## How you can help

LOVE is at **Phase A** (mission definition). Early, honest work:

- **Learning & building** → research/writing `good first issue`s that shape the concept
  (e.g. what "for Everyone" means as concrete design values).
- **A real challenge** → lead the requirements or design-principles definition.
- **Advising / leading** → steward LOVE's direction; bring aerospace, human-factors,
  ethics, or humanitarian-systems expertise.

## Development phases (indicative, evidence-gated)

- **A — Mission definition:** what "Long-Range Orbital Vehicle for Everyone" means
  operationally.
- **B — Vehicle requirements:** duration, orbit classes, payload/passenger concept,
  safety, reusability, maintainability.
- **C — Preliminary design:** propulsion, structures, thermal, power, avionics, GNC,
  comms, software.
- **D — Digital engineering:** digital twin, simulation, hardware-in-the-loop.
- **E — Prototype:** ground demonstrations before any flight.

*Together: **SKYBRIDGE builds the infrastructure. LOVE uses it.** ELION builds both so that
space gradually becomes a domain of broader human participation rather than the isolated
capability of a few organizations.*
