import { NextRequest, NextResponse } from 'next/server';
import admin from '../../../lib/firebaseAdmin';

// POST: Create a new task/project with milestones
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      budget,
      priority,
      deadline,
      skills,
      files,
      onChainTaskId,
      milestones, // Array of { title, amount, description, deadline }
      clientAddress,
    } = body;

    if (!title || !budget || !deadline || !onChainTaskId || !clientAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the task document
    const taskRef = await admin.firestore().collection('tasks').add({
      title,
      description,
      category,
      budget,
      priority,
      deadline,
      skills,
      files: files || [],
      onChainTaskId,
      clientAddress,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'open',
    });

    // Add milestones as subcollection
    if (Array.isArray(milestones) && milestones.length > 0) {
      const milestonesRef = taskRef.collection('milestones');
      for (const milestone of milestones) {
        await milestonesRef.add({
          ...milestone,
          status: 'pending',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }

    return NextResponse.json({ success: true, taskId: taskRef.id });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

// GET: List all tasks/projects (with basic info)
export async function GET() {
  try {
    const snapshot = await admin.firestore().collection('tasks').orderBy('createdAt', 'desc').get();
    const tasks = [];
    for (const doc of snapshot.docs) {
      const data = doc.data();
      tasks.push({ id: doc.id, ...data });
    }
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
} 