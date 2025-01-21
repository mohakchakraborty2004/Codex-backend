# Codex System Design Documentation

## Introduction
This document outlines proposed system designs for the Codex platform. Its divided into two parts.

---

## **Part 1: Problem Setting Workflow**

- **Overview**: Focuses on how problem setters create and manage contests.
- **Features**:
  1. Users can create contests containing one or more problems.
  2. Flexible configurations for contest duration and problem-solving time limits.
  3. Cheating prevention mechanisms, such as tab-switch detection.

#### **Diagram**
![System Design - Part 1](/public/probSetterDesign.png)

---

## **Part 2: Contest Evaluation, Results and winners**

- **Overview**: Details the process of evaluating participant submissions and generating results.
- **Features**:
  1. Real-time evaluation using Judge0 or similar open-source tools.
  2. Immediate feedback on submissions with detailed results.
  3. Rankings and winners are finalized 24 hours after contest end.

#### **Diagram**
![System Design - Part 2](/public/systemDesign.png)
